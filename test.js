oktaSignIn.renderEl(
{ el: '#okta-login-container' },
function (res) {
if (res.status === 'SUCCESS') {

// url will be the url be something like -> https://clicksoftware.okta.com/login/login.htm?fromURI=%2Fapp%2Fclicksoftware_partnerzoneappstoredownloads_1%2Fexka0eagvdbLDT2Bh0x7%2Fsso%2Fsaml%3FRequestBinding%3DHTTPPost%26PartnerId%3Dhttps%3A%2F%2Fpartners.clicksoftware.com%26NameIdFormat%3DEmail%26RelayState%3D-1090635567 

var url = String(window.location.href);

var decodedUrl = decodeURIComponent(url);

// decodedUrl will be https://clicksoftware.okta.com/login/login.htm?fromURI=/app/clicksoftware_partnerzoneappstoredownloads_1/exka0eagvdbLDT2Bh0x7/sso/saml?RequestBinding=HTTPPost&PartnerId=https://partners.clicksoftware.com&NameIdFormat=Email&RelayState=-1090635567 


// At this point they will have to do the string operation on decodedUrl something like below. The number 10 being added to decodedUrl.indexOf(“PartnerId=”) is for the length of string partnerId

var startIndexOfPartnerIdurl = decodedUrl.indexOf('PartnerId=') +10 
var endIndexOfPartnerIdurl = decodedUrl.indexOf('&NameIdFormat=Email')

var partnerUrl = decodedUrl.slice(startIndexOfPartnerIdurl, endIndexOfPartnerIdurl)

// partnerUrl will turn out to be in this example url to -> https://partners.clicksoftware.com


// Similarly extract RelayState Url. 11 being added is length of string RelayState=

var startIndexOfRelayState = decodedUrl.indexOf('RelayState=') + 11 

var relayState = decodedUrl.slice(startIndexOfRelayState)

//relayState will turn out to be -1090635567 which they may need to decode before they can concatenate it with partnerUrl as below. 


//assuming relayState number is decoded. 

var urlToRedirect = partnerUrl + relayState


res.session.setCookieAndRedirect(urlToRedirect);

}
} 
)
