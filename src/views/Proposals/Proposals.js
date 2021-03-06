import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import ProposalsList from '../../components/Proposals/ProposalsList';
import ProposalsActivityFeed from '../../components/Proposals/ProposalsActivityFeed';
import { useRefetchQuery } from '../../contexts/PokemolContext';

const Proposals = () => {
  const [, updateRefetchQuery] = useRefetchQuery();
  useEffect(() => {
    const interval = setInterval(() => {
      updateRefetchQuery('proposals');
    }, 350000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <Flex p={6} wrap='wrap'>
      <>
        <Box
          w={['100%', null, null, null, '60%']}
          pr={[0, null, null, null, 6]}
          pb={6}
        >
          <ProposalsList />
        </Box>

        <Box w={['100%', null, null, null, '40%']}>
          <ProposalsActivityFeed />
        </Box>
      </>
    </Flex>
  );
};

export default Proposals;
