const axios = require('axios')
const cheerio = require('cheerio')
const url = "https://euw.op.gg/summoners/euw/"


/**
 * A function that fetches data from a League of Legends profile.
 * @description Scrapes a website containing League of Legends data and retrieves target information.
 * @param {string} summoner 
 * @returns {Object} Data obtained for the corresponding summoner
 */
const get_profile_stats = async (summoner) => {
    /**
     * Profile Stats
     * @description Contains the fetched data
     * @type {Object}
     */
    const profile_stats = {};
    await axios(url + summoner)
        .then(response => {

            const html = response.data
            const $ = cheerio.load(html)

            const name = $('div.css-nvyacf.e1y28yym3', html).children('.profile').children('.info').children('.name').text();
            name ? profile_stats['summoner'] = name : profile_stats['summoner'] = null;

            const info_solo = $('div.css-13uv2u8.e135kpg1', html).children('.wrapper').children('.info');

            //Rank Solo Duo
            const text = info_solo.children('.tier-rank').text();
            let solo_duo = text.match(/(\w)(\w+\s\d)/);
            solo_duo ? profile_stats['ranked_solo'] = solo_duo[1].toUpperCase() + solo_duo[2] : profile_stats['ranked_solo'] = null;

            //LP
            profile_stats['solo_lp'] = info_solo.children('.tier-info').children('.lp').text().replace(/(\d+).*/, "$1");

            //w/l w/r
            const text_2 = info_solo.children('.tier-info').children('.win-lose').text();
            let w_l = text_2.match(/(\d+)W\s(\d+)L.*\s(\d+)%/);
            if (w_l) {
                profile_stats['solo_wins'] = w_l[1];
                profile_stats['solo_losses'] = w_l[2];
                profile_stats['solo_win_rate'] = w_l[3];
            }

            //Rank Flex
            const info_flex = $('div.css-rxctzc.e135kpg1', html).children('.wrapper').children('.info');

            const text_3 = info_flex.children('.tier-rank').text();
            let flex = text_3.match(/(\w)(\w+\s\d)/);
            flex ? profile_stats['ranked_flex'] = flex[1].toUpperCase() + flex[2] : profile_stats['ranked_flex'] = null;

            //LP
            profile_stats['flex_lp'] = info_flex.children('.tier-info').children('.lp').text().replace(/(\d+).*/, "$1");

            //w/r w/l
            const text_4 = info_flex.children('.tier-info').children('.win-lose').text();
            let w_l_flex = text_4.match(/(\d+)W\s(\d+)L.*\s(\d+)%/);
            if (w_l_flex) {
                profile_stats['flex_wins'] = w_l_flex[1];
                profile_stats['flex_losses'] = w_l_flex[2];
                profile_stats['flex_win_rate'] = w_l_flex[3];
            }

            const top_8_champs = [];
            $('div.champion-box').children('.info').children().children('a').each((i, elem) => {
                top_8_champs.push($(elem).text());
            })
            profile_stats['most_played_champions'] = top_8_champs;

        }).catch(err => console.log(err));

    return profile_stats;
}

module.exports = {get_profile_stats}