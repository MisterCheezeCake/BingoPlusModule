import settings from "../../settings"
import Party from "../../utils/Party"

const partyLineBreak = '&9&m-----------------------------------------------------&r'

filter('blockPartyLineBreak', partyLineBreak)
filter('blockPartyTravelMessagesNew', / &9&l».*/) // https://regex101.com/r/w2zgat/1
filter('blockPartyJoinLeave', /.* (?:has disconnected, they have 5 minutes to rejoin before they are removed from the party|was removed from your party because they disconnected|has left the party|joined the party)\./, true) // https://regex101.com/r/ycPbfQ/3

/**
 * Creates a blocker for certain message criteria.
 * @param {String} setting - the name of the setting to test against
 * @param {RegExp} criteria - the regex to be blocked
 */
function filter(setting, criteria) {
    register("chat", (e) => {
        if (settings()[setting] == 0) return
        if ((Party.leader === 'BingoParty' && settings()[setting] == 1)
         || settings()[setting] == 2) cancel(e)
    }).setCriteria(criteria)
}