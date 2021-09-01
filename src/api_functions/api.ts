/* eslint-disable import/prefer-default-export */
import fetch from 'cross-fetch';

const fetchAccount = async (acc: LolAccount) => {
  const { summonerName, region } = acc;
  try {
    const responseData: any = await fetch(
      `https://express-tp4i3olaqq-ez.a.run.app/riot/summoner/${region}/${summonerName}`
    )
      .then((res) => res.json())
      .then((data) => data);
    const responseLeague: any = await fetch(
      `https://express-tp4i3olaqq-ez.a.run.app/riot/league/${region}/${summonerName}`
    )
      .then((res) => res.json())
      .then((data) => data);

    if (responseData && responseLeague) {
      const account: LolAccount = {
        summonerLevel: responseData.summonerLevel,
        profileIconId: responseData.profileIconId,
        tier: responseLeague.tier,
        rank: responseLeague.rank,
        leaguePoints: responseLeague.leaguePoints,
        wins: responseLeague.wins,
        losses: responseLeague.losses,
      };
      return { ...acc, ...account };
    }

    return acc;
  } catch (error) {
    console.log(error);
    return acc;
  }
};

export { fetchAccount };
