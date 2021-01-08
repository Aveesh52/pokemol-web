import React, { useState, useContext, useEffect } from 'react';

import { daoConstants, daoPresets } from '../../content/summon-presets';
import { SummonContext } from '../../contexts/SummonContext';
import SummonStepOne from '../../components/Summon/SummonStepOne';
import HardModeForm from '../../components/Summon/HardModeForm';
import SummonStepTwo from '../../components/Summon/SummonStepTwo';
import SummonStepThree from '../../components/Summon/SummonStepThree';
import {
  useNetwork,
  useTxProcessor,
  useUser,
  useWeb3Connect,
} from '../../contexts/PokemolContext';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import SummonService from '../../utils/summon-service';
// import BoostPackages from '../../components/Boosts/BoostPackages';
// import MiniLoader from '../../components/Shared/Loading/MiniLoader';

const Summon = () => {
  const [user] = useUser();
  const [network] = useNetwork();
  const [w3Context] = useWeb3Connect();
  const [txProcessor, updateTxProcessor] = useTxProcessor();
  const [hardMode, setHardMode] = useState(false);
  const [daoData, setDaoData] = useState(daoConstants(network.network_id));
  const [isSummoning, setIsSummoning] = useState(false);
  const [summonError, setSummonError] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const { state, dispatch } = useContext(SummonContext);
  // use network to init service
  const stepContent = {
    1: 'What kind of Haus will you build?',
    2: 'Give us the basics',
    3: 'Last chance to make changes',
    4: 'Our magic internet communities take a minute or two to create. You can see new daos on your Hub page',
  };

  const handleSummon = async (data) => {
    setCurrentStep(4);
    setIsSummoning(true);

    setDaoData((prevState) => {
      return {
        ...prevState,
        ...data,
        summon: true,
      };
    });
  };

  const parseSummonresAndShares = (data) => {
    if (!data) {
      return [[], []];
    }
    const lines = data.split('\n');
    const addrs = [];
    const amounts = [];
    lines.forEach((line) => {
      // split on comma or white space
      const summoner = line.split(/,|\s+/).filter((n) => n);
      addrs.push(summoner[0]);
      amounts.push(summoner[1]);
    });
    return [addrs, amounts];
  };

  useEffect(() => {
    if (user?.username) {
      const presets = daoPresets(network.network_id);
      setDaoData({ ...daoData, summoner: user.username, ...presets });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (network?.network_id && w3Context?.web3) {
      const summonService = new SummonService(
        w3Context.web3,
        network.network_id,
      );
      dispatch({ type: 'setService', payload: summonService });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w3Context, network]);

  useEffect(() => {
    const txCallBack = (txHash, details) => {
      console.log('txCallBack', txProcessor);
      if (txProcessor && txHash) {
        txProcessor.setTx(txHash, user.username, details, true, false, false);
        txProcessor.forceCheckTx = true;
        // state.service.cacheNewMoloch(newMoloch)
        updateTxProcessor(txProcessor);
      }
      if (!txHash) {
        console.log('error: ', details);
        setSummonError(details?.message);
        setIsSummoning(false);
      }
    };

    const summonDao = async () => {
      const [addrs, shares] = parseSummonresAndShares(
        daoData.summonerAndShares,
      );
      if (addrs.length) {
        daoData.summoner = addrs;
        daoData.summonerShares = shares;
      } else {
        daoData.summoner = [daoData.summoner];
        daoData.summonerShares = [1];
      }

      console.log('summoning HERE', daoData);
      await state.service.summonMoloch(daoData, user.username, txCallBack);
    };

    if (daoData.summon) {
      summonDao();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daoData]);

  useEffect(() => {
    if (state.status === 'error') {
      setIsSummoning(false);
      setCurrentStep(3);
    }

    if (state.status === 'complete') {
      dispatch({ type: 'clearState' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Box p={6}>
      {user && user.username ? (
        <Box>
          <Box className='Summon__hero'>
            <Heading as='h1'>SUMMON</Heading>
          </Box>

          <Box className='View Summon'>
            <Box className='Row'>
              <Box className='Summon__step'>
                {currentStep > 4 ? (
                  <Heading as='h3'>Step {currentStep}</Heading>
                ) : null}
                <Text>{stepContent[currentStep]}</Text>
              </Box>
              {currentStep > 4 ? <button>Get Help</button> : null}
            </Box>

            {state.status === 'error' ? (
              <Heading as='h1'>
                {state.errorMessage.message || state.errorMessage}
              </Heading>
            ) : null}

            {summonError && (
              <Heading as='h1'>{summonError.message || summonError}</Heading>
            )}

            {!isSummoning ? (
              <>
                {!hardMode ? (
                  <>
                    {currentStep === 1 ? (
                      <SummonStepOne
                        daoData={daoData}
                        setDaoData={setDaoData}
                        setCurrentStep={setCurrentStep}
                      />
                    ) : null}

                    {currentStep === 2 ? (
                      <SummonStepTwo
                        daoData={daoData}
                        setDaoData={setDaoData}
                        setCurrentStep={setCurrentStep}
                      />
                    ) : null}

                    {currentStep === 3 ? (
                      <SummonStepThree
                        daoData={daoData}
                        setDaoData={setDaoData}
                        setCurrentStep={setCurrentStep}
                        handleSummon={handleSummon}
                      />
                    ) : null}

                    {currentStep === 1 ? (
                      <Box className='ModeSwitch'>
                        <Text style={{ width: '100%', textAlign: 'center' }}>
                          I&apos;m a DAO master, take me to{' '}
                          <Button
                            className='mode-link'
                            onClick={() => setHardMode(true)}
                          >
                            Hard Mode
                          </Button>
                        </Text>
                      </Box>
                    ) : null}
                  </>
                ) : (
                  <>
                    <HardModeForm
                      daoData={daoData}
                      setDaoData={setDaoData}
                      handleSummon={handleSummon}
                    />
                    <Box className='ModeSwitch'>
                      <Text style={{ width: '100%', textAlign: 'center' }}>
                        Take me back to{' '}
                        <Button
                          className='mode-link'
                          onClick={() => setHardMode(false)}
                        >
                          Fun Mode.
                        </Button>
                      </Text>
                    </Box>
                  </>
                )}
              </>
            ) : (
              <>Loading</>
            )}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default Summon;
