export const getFilterOptions = (isMember, actionNeededCount) => {
  const options = [
    {
      name: 'Action Needed',
      value: 'Action Needed',
      type: 'main',
    },
    {
      name: 'All',
      value: 'All',
      type: 'main',
    },
    {
      name: 'Funding Proposals',
      value: 'Funding Proposal',
      type: 'proposalType',
    },
    {
      name: 'Member Proposals',
      value: 'Member Proposal',
      type: 'proposalType',
    },
    {
      name: 'Whitelist Token Proposals',
      value: 'Whitelist Token Proposal',
      type: 'proposalType',
    },
    {
      name: 'Trade Proposals',
      value: 'Trade Proposal',
      type: 'proposalType',
    },
    {
      name: 'Guildkick Proposals',
      value: 'Guildkick Proposal',
      type: 'proposalType',
    },
    {
      name: 'Minion Proposals',
      value: 'Minion Proposal',
      type: 'proposalType',
    },
    {
      name: 'Unsponsored',
      value: 'Unsponsored',
      type: 'status',
    },
    {
      name: 'In Queue',
      value: 'InQueue',
      type: 'status',
    },
    {
      name: 'Voting Period',
      value: 'VotingPeriod',
      type: 'status',
    },
    {
      name: 'Grace Period',
      value: 'GracePeriod',
      type: 'status',
    },
    {
      name: 'Ready For Processing',
      value: 'ReadyForProcessing',
      type: 'status',
    },
    {
      name: 'Passed',
      value: 'Passed',
      type: 'status',
    },
    {
      name: 'Failed',
      value: 'Failed',
      type: 'status',
    },
    {
      name: 'Cancelled',
      value: 'Cancelled',
      type: 'status',
    },
  ];

  if (!isMember || !actionNeededCount) {
    options.splice(0, 1);
  }

  return options;
};

export const sortOptions = [
  {
    name: 'Newest',
    value: 'submissionDateDesc',
  },
  {
    name: 'Oldest',
    value: 'submissionDateAsc',
  },
  {
    name: 'Most Votes',
    value: 'voteCountDesc',
  },
];
