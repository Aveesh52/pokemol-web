import React from 'react';
import { Flex, Image, Box, Icon } from '@chakra-ui/react';
import { RiArrowDropDownFill } from 'react-icons/ri';

import {
  useDao,
  useBalances,
  useProposals,
} from '../../contexts/PokemolContext';
import { useTheme } from '../../contexts/CustomThemeContext';
import TextBox from '../Shared/TextBox';
import BankOverviewChart from '../Bank/BankOverviewChart';
import ProposalCard from '../Proposals/ProposalCard';
import { themeImagePath } from '../../utils/helpers';

const ThemePreview = ({ previewValues }) => {
  const [dao] = useDao();
  const [theme] = useTheme();
  const [balances] = useBalances();
  const [proposals] = useProposals();

  // TODO: How to get the font from previewValues?

  return (
    <Flex
      m={6}
      h='600px'
      bgImage={`url(${
        previewValues.bgImg.slice(0, 2) === 'Qm'
          ? `https://ipfs.infura.io/ipfs/${previewValues.bgImg}`
          : previewValues.bgImg
      })`}
      bgPosition='center center'
      bgRepeat='no-repeat'
      bgColor={previewValues.bg500}
      border={`0.5px solid ${theme.colors.whiteAlpha[600]}`}
      borderRadius='2px'
      overflow='scroll'
      pr={6}
    >
      <Flex h='900px' w='100px' justify='center' bg={previewValues.primary500}>
        <Image
          src={themeImagePath(dao.avatarImg)}
          borderRadius='40px'
          height='50px'
          width='50px'
          mt='20px'
          bg={previewValues.primary500}
          p='5px'
        />
      </Flex>
      <Flex w='100%' direction='column'>
        <TextBox
          size='xl'
          colorScheme='whiteAlpha.900'
          fontWeight={800}
          ml={6}
          my={6}
        >
          {dao.name}
        </TextBox>
        <Box ml={6}>
          <BankOverviewChart balances={balances} dao={dao} />
        </Box>

        <Flex w='70%' justify='space-between' mx={6} mt={6}>
          <Flex>
            <TextBox>Filter By</TextBox>
            <Box
              color={previewValues.secondary500}
              fontFamily='heading'
              textTransform='uppercase'
              ml={2}
            >
              All <Icon as={RiArrowDropDownFill} />
            </Box>
          </Flex>
          <Flex>
            <TextBox>Sort By</TextBox>{' '}
            <Box
              color={previewValues.secondary500}
              fontFamily='heading'
              textTransform='uppercase'
              ml={2}
            >
              Newest <Icon as={RiArrowDropDownFill} />
            </Box>
          </Flex>
        </Flex>
        <Box m={6} mb={10}>
          {proposals && proposals.length ? (
            <ProposalCard
              proposal={proposals[0]}
              key={proposals[0].id}
              isLoaded={proposals}
            />
          ) : null}
        </Box>
        <Box h={20} />
      </Flex>
    </Flex>
  );
};

export default ThemePreview;
