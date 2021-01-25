import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  Box,
} from '@chakra-ui/react';

import { useTheme } from '../../contexts/CustomThemeContext';
import MemberProposalForm from '../Forms/Proposals/MemberProposal';
import FundingProposalForm from '../Forms/Proposals/FundingProposal';
import WhitelistProposalForm from '../Forms/Proposals/WhitelistProposal';
import GuildKickProposalForm from '../Forms/Proposals/GuildKickProposal';
import TradeProposalForm from '../Forms/Proposals/TradeProposal';
import MinionSimpleProposalForm from '../Forms/Minion/MinionSimpleProposal';
import TransmutationProposal from '../Forms/Minion/TransmutationProposal';
import { useModals } from '../../contexts/PokemolContext';

const ProposalFormModal = ({ proposalType, isOpen, returnRoute }) => {
  const [, setLoading] = useState(false);
  const [proposalForm, setProposalForm] = useState(null);
  const [theme] = useTheme();
  const history = useHistory();
  const { closeModals } = useModals();

  const proposalForms = {
    member: {
      type: `New ${theme.daoMeta.proposal}`,
      heading: `New ${theme.daoMeta.member} ${theme.daoMeta.proposal}`,
      subline: `Submit your membership proposal here.`,
      form: <MemberProposalForm />,
    },
    funding: {
      type: `New ${theme.daoMeta.proposal}`,
      heading: `New Funding ${theme.daoMeta.proposal}`,
      subline: `Submit a funding proposal here.`,
      form: <FundingProposalForm />,
    },
    whitelist: {
      type: `New ${theme.daoMeta.proposal}`,
      heading: `New Whitelist ${theme.daoMeta.proposal}`,
      subline: `Whitelist a token here.`,
      form: <WhitelistProposalForm />,
    },
    guildkick: {
      type: `New ${theme.daoMeta.proposal}`,
      heading: `New GuildKick ${theme.daoMeta.proposal}`,
      subline: `Kick a perpetrator here.`,
      form: <GuildKickProposalForm />,
    },
    trade: {
      type: `New ${theme.daoMeta.proposal}`,
      heading: `New Trade ${theme.daoMeta.proposal}`,
      subline: `Submit a trade proposal here.`,
      form: <TradeProposalForm />,
    },
    minion: {
      type: `New ${theme.daoMeta.proposal}`,
      heading: `New Minion ${theme.daoMeta.proposal}`,
      subline: `Submit a Minion proposal here.`,
      form: <MinionSimpleProposalForm />,
    },
    transmutation: {
      type: `New ${theme.daoMeta.proposal}`,
      heading: `New Transmutation ${theme.daoMeta.proposal}`,
      subline: `Submit a Transmutation proposal here.`,
      form: <TransmutationProposal />,
    },
  };

  useEffect(() => {
    if (proposalType) {
      setProposalForm(proposalForms[proposalType]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposalType]);

  const handleClose = () => {
    setLoading(false);
    closeModals();
    if (returnRoute) {
      history.push(returnRoute);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      {proposalForm && (
        <ModalContent
          rounded='lg'
          bg='blackAlpha.600'
          borderWidth='1px'
          borderColor='whiteAlpha.200'
          maxWidth='800px'
        >
          <ModalHeader>
            <Box
              fontFamily='heading'
              textTransform='uppercase'
              fontSize='xs'
              fontWeight={700}
              color='#7579C5'
              mb={4}
            >
              {proposalForm.heading}
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Box color='#C4C4C4' mb={6}>
              {proposalForm.subline}
            </Box> */}
            {proposalForm.form}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default ProposalFormModal;
