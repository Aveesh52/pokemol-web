import { Flex, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DaoActivityFeed from '../../components/Dao/DaoActivityFeed';
import DaoOverviewDetails from '../../components/Dao/DaoOverviewDetails';
import NewSummonerModal from '../../components/Modal/NewSummonerModal';
import MemberInfoCard from '../../components/Shared/MemberInfoCard/MemberInfoCard';

import {
  useDao,
  useUser,
  useMemberWallet,
  useModals,
  useProposals,
} from '../../contexts/PokemolContext';

const Dao = () => {
  const [dao] = useDao();
  const [proposals] = useProposals();
  const [user] = useUser();
  const [memberWallet] = useMemberWallet();
  const [isMember, setIsMember] = useState(false);
  const { modals, openModal } = useModals();

  useEffect(() => {
    if (memberWallet) {
      setIsMember(memberWallet.shares > 0);
    }
  }, [memberWallet]);

  useEffect(() => {
    if (proposals && !proposals.length) {
      // this popup still shows, proposals must be set empty on transition
      openModal('newSummonerModal');
    }
    // eslint-disable-next-line
  }, [proposals]);

  return (
    <>
      <Box p={6} w='100%'>
        <Flex wrap='wrap'>
          <Box
            w={['100%', null, null, null, '50%']}
            pr={[0, null, null, null, 6]}
            mb={6}
          >
            <DaoOverviewDetails dao={dao} />
          </Box>
          {user && isMember ? (
            <Box w={['100%', null, null, null, '50%']}>
              <MemberInfoCard user={user} />
              {dao.graphData && (
                <Box mt={6}>
                  <DaoActivityFeed />
                </Box>
              )}
            </Box>
          ) : null}
        </Flex>
      </Box>
      <NewSummonerModal isOpen={modals.newSummonerModal} />
    </>
  );
};

export default Dao;
