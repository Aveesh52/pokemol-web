import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfile } from '3box';
import { Badge, Box, Heading, Stack, Skeleton } from '@chakra-ui/react';

import { formatCreatedAt } from '../../utils/helpers';
import TextBox from '../Shared/TextBox';
import ContentBox from '../Shared/ContentBox';
import MemberAvatar from '../Members/MemberAvatar';
import { supportedChains } from '../../utils/chains';

const ActivityCard = ({ activity, isLoaded }) => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    let isCancelled = false;
    const fetchProfile = async () => {
      let profileRes;
      try {
        profileRes = await getProfile(activity.memberAddress);
      } catch (err) {}

      if (!isCancelled) {
        setProfile({
          memberAddress: activity.memberAddress,
          profile: profileRes,
        });
      }
    };

    if (activity.memberAddress) {
      fetchProfile();
    }

    return () => {
      isCancelled = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  const networkName = (networkId) => {
    return supportedChains[networkId].network;
  };

  return (
    <ContentBox mt={3}>
      {activity.proposalId && (
        <>
          <Skeleton isLoaded={isLoaded}>
            <Link to={`/dao/${activity.molochAddress}`}>
              <TextBox size='xs' mb={2}>
                {activity.daoTitle}{' '}
                {activity.networkId ? (
                  <>- {networkName(activity.networkId)}</>
                ) : null}
              </TextBox>
              <Heading as='h4' size='sm' fontWeight='100'>
                {activity.proposalType}: {activity.title}
              </Heading>
            </Link>

            <Stack isInline mt={3}>
              <Badge variant='solid'>{activity.activityFeed.message}</Badge>
              <Badge colorScheme='green'>{activity.yesVotes} Yes</Badge>
              <Badge colorScheme='red'>{activity.noVotes} No</Badge>
            </Stack>
          </Skeleton>
        </>
      )}
      {!activity.proposalId && (
        <>
          <Skeleton isLoaded={isLoaded}>
            <Link to={`/dao/${activity.molochAddress}`}>
              <Heading as='h4' size='md'>
                {activity?.createdAt
                  ? `Rage Quit ${activity.daoTitle} on ${formatCreatedAt(
                      activity.createdAt,
                    )}`
                  : '--'}
              </Heading>
            </Link>
            <Box>Shares: {activity?.shares ? activity.shares : '--'}</Box>
            <Box>Loot: {activity?.loot ? activity.loot : '--'}</Box>
            <Box>
              <MemberAvatar member={profile} />
            </Box>
          </Skeleton>
        </>
      )}
    </ContentBox>
  );
};

export default ActivityCard;
