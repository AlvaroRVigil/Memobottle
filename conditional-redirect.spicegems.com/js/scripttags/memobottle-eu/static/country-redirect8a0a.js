function SGRedirecto()
{


var REDIRECTO = {};
var StoreName = '';



REDIRECTO.setDefaultData = function(selector,data)
{
selector.find("#spicegems_cr_mod_msg").html(data['customer_message']);
selector.find("#spicegems_cr_btn_yes").html(data['yes_button_text']);
selector.find("#spicegems_cr_btn_no").html(data['no_button_text']);
};


REDIRECTO.isNewAndCurrentURLSame = function(countryURL)
{
try {
var currentURL = window.location.href;

currentURL = currentURL.replace("//www.", "//").replace(/\/$/, "").split('/');
currentURL = currentURL[2];

var newURL = countryURL.replace("//www.", "//").replace(/\/$/, "").split('/');
newURL = newURL[2];

console.log(currentURL);
console.log(newURL);

if(currentURL !== newURL) {
return true;
}
}
catch(err) {}

return false;
};



REDIRECTO.redirect = function()
{
if(REDIRECTO.autoredirect!=1)
{
$.cookie("country_redirect_spicegems", 1,{ expires: 60, path: '/' });
}

var countryURL = REDIRECTO.countryURL;

countryURL = (countryURL.indexOf('://') == -1) ? 'http://' + countryURL : countryURL;

if(REDIRECTO.add_relative_url==1)
{
countryURL = countryURL + REDIRECTO.getRelativeURL();
}

window.location.href = countryURL;
};


REDIRECTO.closeBox = function()
{
$.cookie("country_redirect_spicegems", 1,{ expires: 60, path: '/' });

var top_bar = $("#spicegems_cr_top_bar");
if(top_bar.length)
{
top_bar.remove();
}

var modal_box = $("#sg_country_redirect_mod");
if(modal_box.length)
{
modal_box.modal("hide");
}
};

REDIRECTO.extend = function(defaults, options){
var extended = {};
var prop;

for (prop in defaults) {
if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
extended[prop] = defaults[prop];
}
}

for (prop in options) {
if (Object.prototype.hasOwnProperty.call(options, prop)) {
extended[prop] = options[prop];
}
}
return extended;
};

REDIRECTO.fetchURL = function(code,current_ip)
{
var all_data = JSON.parse('{"countries":{"2":{"name":"Global Redirect","url":"https:\\/\\/www.memobottle.com","store_name":"memobottle Global","add_relative_url":1},"1":{"name":"Australia Redirect","url":"https:\\/\\/www.memobottle.com.au","store_name":"memobottle Australia","add_relative_url":1}},"countryData":[{"2":["AF","AX","DZ","AS","AO","AQ","AG","AR","AZ","BZ","BJ","BM","BT","BO","BQ","BW","BV","BR","IO","BN","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CG","CD","CK","CR","CI","CU","CW","DJ","DM","DO","EC","SV","GQ","ER","ET","FK","FO","FJ","GF","PF","TF","GA","GM","GE","GH","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","HN","HK","IN","ID","IR","IQ","IM","JM","JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LB","LS","LR","LY","MM","NA","NR","NP","NC","NI","NE","NG","NU","NF","MP","OM","PR","QA","RE","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","SC","SL","SG","SX","SB","SO","ZA","GS","SS","LK","SD","SR","SJ","SZ","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TM","TC","TV","AE","US","UM","UY","UZ","VU","VE","VN","VG","VI","YE","ZM","ZW"]},{"1":["AU","NZ"]}],"message_show_option":"top_banner","yes_button_text":"Yes","no_button_text":"No","custom_css":"","customer_message":"Do you want to redirect to Official Site, Are you Sure","exclude_ip":"","autoredirect":1,"app_status":1,"default_rule":{"fallback_url":""},"all_countries":{"AF":"Afghanistan","AX":"\\u00c5land Islands","AL":"Albania","DZ":"Algeria","AS":"American Samoa","AD":"Andorra","AO":"Angola","AI":"Anguilla","AQ":"Antarctica","AG":"Antigua and Barbuda","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia, Plurinational State of","BQ":"Bonaire, Sint Eustatius and Saba","BA":"Bosnia and Herzegovina","BW":"Botswana","BV":"Bouvet Island","BR":"Brazil","IO":"British Indian Ocean Territory","BN":"Brunei Darussalam","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","KH":"Cambodia","CM":"Cameroon","CA":"Canada","CV":"Cape Verde","KY":"Cayman Islands","CF":"Central African Republic","TD":"Chad","CL":"Chile","CN":"China","CX":"Christmas Island","CC":"Cocos (Keeling) Islands","CO":"Colombia","KM":"Comoros","CG":"Congo","CD":"Congo, the Democratic Republic of the","CK":"Cook Islands","CR":"Costa Rica","CI":"C\\u00f4te d`Ivoire","HR":"Croatia","CU":"Cuba","CW":"Cura\\u00e7ao","CY":"Cyprus","CZ":"Czech Republic","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","ET":"Ethiopia","FK":"Falkland Islands (Malvinas)","FO":"Faroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","GF":"French Guiana","PF":"French Polynesia","TF":"French Southern Territories","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GI":"Gibraltar","GR":"Greece","GL":"Greenland","GD":"Grenada","GP":"Guadeloupe","GU":"Guam","GT":"Guatemala","GG":"Guernsey","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","HM":"Heard Island and McDonald Islands","VA":"Holy See (Vatican City State)","HN":"Honduras","HK":"Hong Kong","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran, Islamic Republic of","IQ":"Iraq","IE":"Ireland","IM":"Isle of Man","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JE":"Jersey","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KP":"Korea, Democratic People`s Republic of","KR":"Korea, Republic of","KW":"Kuwait","KG":"Kyrgyzstan","LA":"Lao People`s Democratic Republic","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libya","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MO":"Macao","MK":"Macedonia, the Former Yugoslav Republic of","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MQ":"Martinique","MR":"Mauritania","MU":"Mauritius","YT":"Mayotte","MX":"Mexico","FM":"Micronesia, Federated States of","MD":"Moldova, Republic of","MC":"Monaco","MN":"Mongolia","ME":"Montenegro","MS":"Montserrat","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar","NA":"Namibia","NR":"Nauru","NP":"Nepal","NL":"Netherlands","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue","NF":"Norfolk Island","MP":"Northern Mariana Islands","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PS":"Palestine, State of","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PN":"Pitcairn","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RE":"R\\u00e9union","RO":"Romania","RU":"Russian Federation","RW":"Rwanda","BL":"Saint Barth\\u00e9lemy","SH":"Saint Helena, Ascension and Tristan da Cunha","KN":"Saint Kitts and Nevis","LC":"Saint Lucia","MF":"Saint Martin (French part)","PM":"Saint Pierre and Miquelon","VC":"Saint Vincent and the Grenadines","WS":"Samoa","SM":"San Marino","ST":"Sao Tome and Principe","SA":"Saudi Arabia","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SX":"Sint Maarten (Dutch part)","SK":"Slovakia","SI":"Slovenia","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","GS":"South Georgia and the South Sandwich Islands","SS":"South Sudan","ES":"Spain","LK":"Sri Lanka","SD":"Sudan","SR":"Suriname","SJ":"Svalbard and Jan Mayen","SZ":"Swaziland","SE":"Sweden","CH":"Switzerland","SY":"Syrian Arab Republic","TW":"Taiwan, Province of China","TJ":"Tajikistan","TZ":"Tanzania, United Republic of","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad and Tobago","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TC":"Turks and Caicos Islands","TV":"Tuvalu","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States","UM":"United States Minor Outlying Islands","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VE":"Venezuela, Bolivarian Republic of","VN":"Viet Nam","VG":"Virgin Islands, British","VI":"Virgin Islands, U.S.","WF":"Wallis and Futuna","EH":"Western Sahara","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"}}');
var selected_country_id = '-1';

var $current_country;

var defaultSettings = {exclude_ip:'', custom_css:''};
all_data = REDIRECTO.extend(defaultSettings, all_data);

var exclude_ip = all_data.exclude_ip;
exclude_ip = exclude_ip.trim();


if(!all_data.app_status)
{
return false;
}

if(exclude_ip.indexOf(current_ip)!='-1')
{
return true;
}


if(all_data.countryData)
{
var $countryData = all_data.countryData;

var a, b;
for(a in $countryData)
{
for(b in $countryData[a])
{
var selectedCountries = $countryData[a][b];
if(selectedCountries.indexOf(code)!='-1')
{
selected_country_id = b;
break;
}
}
}
}


REDIRECTO.barAndModelDefaultData = function(eleSelector, all_data)
{
REDIRECTO.setDefaultData(eleSelector,all_data);

var custom_css = '<style>'+all_data.custom_css+'</style>';
$('body').append(custom_css);
};


if(all_data.countries[selected_country_id] == undefined)
{
if(all_data['default_rule']!='')
{
$current_country = all_data['default_rule'];

REDIRECTO.countryURL = $current_country['fallback_url'];

if($current_country['enable_fallback_settings']!="1")
{
return '';
}
}
}
else
{
$current_country = all_data.countries[selected_country_id];
REDIRECTO.countryURL = $current_country['url'];
}

if(location.href==REDIRECTO.countryURL || REDIRECTO.countryURL==''){
return '';
}

if(!REDIRECTO.isNewAndCurrentURLSame(REDIRECTO.countryURL)){
return false;
}

var country_name = all_data['all_countries'][code];


var message_show_option = all_data['message_show_option'];
var host = window.location.href;

REDIRECTO.autoredirect = all_data.autoredirect;
REDIRECTO.add_relative_url = $current_country.add_relative_url;

if(REDIRECTO.autoredirect==1)
{
REDIRECTO.redirect();
}
else
{



function SGAfterDocumentReady()
{
loadCookieJS();
if($.cookie("country_redirect_spicegems")==1) {
return false;
}

var $body = $('body');
var eleSelector = $body.find("#sg_country_redirect_mod");

var cout_msg =  all_data['customer_message'];
StoreName = $current_country['store_name'];

cout_msg = cout_msg.split('[country-name]').join(country_name);
cout_msg = cout_msg.split('[store-name]').join(StoreName);

all_data['customer_message'] = cout_msg;



if(message_show_option=='box')
{
$body.append(JSON.parse('\"<style>\\n\\n    \\/*------New Button Style------------------------------------*\\/\\n    .spicegems_cr_main-btn {\\n        color:#fff;\\n        background:#3D9AD1 ;\\n        font-size:14px;\\n        padding:8px 15px;\\n        font-weight: normal;\\n        margin: 6px 0;\\n        border-radius:2px;\\n        display: inline-block;\\n        text-decoration: none;\\n        font-family: \'Open Sans\', sans-serif;\\n        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        transition: all 0.3s ease-in-out 0s;\\n        transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\\n    }\\n\\n    #spicegems_cr_btn_yes{\\n        color:#fff;\\n        background-color:#4caf50;\\n    }\\n    #spicegems_cr_btn_no{\\n        color:#fff;\\n        background-color: #f44336;\\n    }\\n    .spicegems_cr_main-btn:hover, .spicegems_cr_main-btn:active {\\n        color:#fff;\\n        opacity:0.8;\\n    }\\n<\\/style>\\n<style>\\n\\n    \\/*---------Country Redirect Model Css---------------------------------------------------*\\/\\n    #sg_country-redirect_mod{\\n\\n    }\\n    .spicegems_cr_close {\\n        float: right;\\n        font-size: 21px;\\n        font-weight: bold;\\n        line-height: 1;\\n        color: #fff;\\n        text-shadow: 0 1px 0 #fff;\\n        filter: alpha(opacity=20);\\n        opacity: .2;\\n    }\\n    .spicegems_cr_close:hover,\\n    .spicegems_cr_close:focus {\\n        color: #fff;\\n        text-decoration: none;\\n        cursor: pointer;\\n        filter: alpha(opacity=50);\\n        opacity: .5;\\n    }\\n    button.spicegems_cr_close {\\n        -webkit-appearance: none;\\n        padding: 0;\\n        cursor: pointer;\\n        background: transparent;\\n        border: 0;\\n    }\\n    .spicegems_cr_modal-open {\\n        overflow: hidden;\\n    }\\n    .spicegems_cr_modal {\\n        position: fixed;\\n        top: 0;\\n        right: 0;\\n        bottom: 0;\\n        left: 0;\\n        z-index:500000000;\\n        display: none;\\n        overflow: hidden;\\n        -webkit-overflow-scrolling: touch;\\n        outline: 0;\\n    }\\n    .spicegems_cr_modal.fade .spicegems_cr_modal-dialog {\\n        -webkit-transition: -webkit-transform .3s ease-out;\\n        -o-transition:      -o-transform .3s ease-out;\\n        transition:         transform .3s ease-out;\\n        -webkit-transform: translate3d(0, -25%, 0);\\n        -o-transform: translate3d(0, -25%, 0);\\n        transform: translate3d(0, -25%, 0);\\n    }\\n    .spicegems_cr_modal.in .spicegems_cr_modal-dialog {\\n        -webkit-transform: translate3d(0, 0, 0);\\n        -o-transform: translate3d(0, 0, 0);\\n        transform: translate3d(0, 0, 0);\\n    }\\n    .spicegems_cr_modal-open .spicegems_cr_modal {\\n        overflow-x: hidden;\\n        overflow-y: auto;\\n    }\\n    .spicegems_cr_modal-dialog {\\n        position: relative;\\n        width: auto;\\n        margin: 10px;\\n    }\\n    .spicegems_cr_modal-content {\\n        position: relative;\\n        background-color: #fff;\\n        -webkit-background-clip: padding-box;\\n        background-clip: padding-box;\\n        border: 1px solid #999;\\n        border: 1px solid rgba(0, 0, 0, .2);\\n        border-radius:4px;\\n        outline: 0;\\n        -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\\n        box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\\n    }\\n    #spicegems_cr_mod_msg{\\n        font-family: sans-serif;\\n        font-size:20px;\\n        color: #2b3d4c;\\n    }\\n    .spicegems_cr_modal-backdrop {\\n        position: fixed;\\n        top: 0;\\n        right: 0;\\n        bottom: 0;\\n        left: 0;\\n        z-index:400000000;\\n        background-color: #000;\\n    }\\n    .spicegems_cr_modal-backdrop.fade {\\n        filter: alpha(opacity=0);\\n        opacity: 0;\\n    }\\n    .spicegems_cr_modal-backdrop.in {\\n        filter: alpha(opacity=50);\\n        opacity: .5;\\n    }\\n    .spicegems_cr_modal-header {\\n        background:#3D9AD1;\\n        color:#fff;\\n        border-bottom: 1px solid #3D9AD1;\\n        padding: 12px 15px;\\n        border-top-left-radius: 2px;\\n        border-top-right-radius: 2px;\\n        font-size: 18px;\\n        font-family: sans-serif;\\n    }\\n\\n    .spicegems_cr_modal-header .close {\\n        margin-top: -2px;\\n    }\\n    .spicegems_cr_modal-title {\\n        margin: 0;\\n        line-height: 1.42857143;\\n    }\\n    .spicegems_cr_modal-body {\\n        position: relative;\\n        padding:50px 15px;\\n        text-align:center;\\n\\n    }\\n\\n    .spicegems_cr_modal-footer {\\n        text-align: center;\\n        border-top: 1px solid #ddd;\\n        padding: 10px 15px;\\n    }\\n\\n    .spicegems_cr_modal-scrollbar-measure {\\n        position: absolute;\\n        top: -9999px;\\n        width: 50px;\\n        height: 50px;\\n        overflow: scroll;\\n    }\\n    @media (min-width: 768px) {\\n        .spicegems_cr_modal-dialog {\\n            width: 600px;\\n            margin: 30px auto;\\n        }\\n        .spicegems_cr_modal-content {\\n            -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\\n            box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\\n        }\\n        .spicegems_cr_modal-sm {\\n            width: 300px;\\n        }\\n    }\\n    @media (min-width: 992px) {\\n        .spicegems_cr_modal-lg {\\n            width: 900px;\\n        }\\n    }\\n    #spicegems_cr_mod_sitelogo{\\n        text-align:center;\\n        margin-bottom:15px;\\n    }\\n    #spicegems_cr_mod_sitelogo img{\\n        width: 60%;\\n        display: block;\\n        margin:0 auto;\\n    }\\n\\n    \\/*--Img Responsive----*\\/\\n    .sg_cbr_img-responsive {\\n        width: 100% \\\\9;\\n        max-width: 100%;\\n        height: auto;\\n    }\\n<\\/style>\\n\\n\\n\\n\\n<script>\\n    if(typeof($.fn.modal) === \'undefined\') {\\n        if(\\\"undefined\\\"==typeof jQuery)throw new Error(\\\"Bootstrap\'s JavaScript requires jQuery\\\");+function(t){\\\"use strict\\\";var e=t.fn.jquery.split(\\\" \\\")[0].split(\\\".\\\");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>3)throw new Error(\\\"Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4\\\")}(jQuery),+function(t){\\\"use strict\\\";function e(e,o){return this.each(function(){var s=t(this),n=s.data(\\\"bs.modal\\\"),r=t.extend({},i.DEFAULTS,s.data(),\\\"object\\\"==typeof e&&e);n||s.data(\\\"bs.modal\\\",n=new i(this,r)),\\\"string\\\"==typeof e?n[e](o):r.show&&n.show(o)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(\\\".modal-dialog\\\"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(\\\".modal-content\\\").load(this.options.remote,t.proxy(function(){this.$element.trigger(\\\"loaded.bs.modal\\\")},this))};i.VERSION=\\\"3.3.7\\\",i.TRANSITION_DURATION=300,i.BACKDROP_TRANSITION_DURATION=150,i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var o=this,s=t.Event(\\\"show.bs.modal\\\",{relatedTarget:e});this.$element.trigger(s),this.isShown||s.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass(\\\"modal-open\\\"),this.escape(),this.resize(),this.$element.on(\\\"click.dismiss.bs.modal\\\",\'[data-dismiss=\\\"modal\\\"]\',t.proxy(this.hide,this)),this.$dialog.on(\\\"mousedown.dismiss.bs.modal\\\",function(){o.$element.one(\\\"mouseup.dismiss.bs.modal\\\",function(e){t(e.target).is(o.$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var s=t.support.transition&&o.$element.hasClass(\\\"fade\\\");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.adjustDialog(),s&&o.$element[0].offsetWidth,o.$element.addClass(\\\"in\\\"),o.enforceFocus();var n=t.Event(\\\"shown.bs.modal\\\",{relatedTarget:e});s?o.$dialog.one(\\\"bsTransitionEnd\\\",function(){o.$element.trigger(\\\"focus\\\").trigger(n)}).emulateTransitionEnd(i.TRANSITION_DURATION):o.$element.trigger(\\\"focus\\\").trigger(n)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event(\\\"hide.bs.modal\\\"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off(\\\"focusin.bs.modal\\\"),this.$element.removeClass(\\\"in\\\").off(\\\"click.dismiss.bs.modal\\\").off(\\\"mouseup.dismiss.bs.modal\\\"),this.$dialog.off(\\\"mousedown.dismiss.bs.modal\\\"),t.support.transition&&this.$element.hasClass(\\\"fade\\\")?this.$element.one(\\\"bsTransitionEnd\\\",t.proxy(this.hideModal,this)).emulateTransitionEnd(i.TRANSITION_DURATION):this.hideModal())},i.prototype.enforceFocus=function(){t(document).off(\\\"focusin.bs.modal\\\").on(\\\"focusin.bs.modal\\\",t.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger(\\\"focus\\\")},this))},i.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on(\\\"keydown.dismiss.bs.modal\\\",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off(\\\"keydown.dismiss.bs.modal\\\")},i.prototype.resize=function(){this.isShown?t(window).on(\\\"resize.bs.modal\\\",t.proxy(this.handleUpdate,this)):t(window).off(\\\"resize.bs.modal\\\")},i.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass(\\\"modal-open\\\"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger(\\\"hidden.bs.modal\\\")})},i.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var o=this,s=this.$element.hasClass(\\\"fade\\\")?\\\"fade\\\":\\\"\\\";if(this.isShown&&this.options.backdrop){var n=t.support.transition&&s;if(this.$backdrop=t(document.createElement(\\\"div\\\")).addClass(\\\"modal-backdrop \\\"+s).appendTo(this.$body),this.$element.on(\\\"click.dismiss.bs.modal\\\",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&(\\\"static\\\"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),n&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass(\\\"in\\\"),!e)return;n?this.$backdrop.one(\\\"bsTransitionEnd\\\",e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass(\\\"in\\\");var r=function(){o.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass(\\\"fade\\\")?this.$backdrop.one(\\\"bsTransitionEnd\\\",r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):r()}else e&&e()},i.prototype.handleUpdate=function(){this.adjustDialog()},i.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:\\\"\\\",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:\\\"\\\"})},i.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:\\\"\\\",paddingRight:\\\"\\\"})},i.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},i.prototype.setScrollbar=function(){var t=parseInt(this.$body.css(\\\"padding-right\\\")||0,10);this.originalBodyPad=document.body.style.paddingRight||\\\"\\\",this.bodyIsOverflowing&&this.$body.css(\\\"padding-right\\\",t+this.scrollbarWidth)},i.prototype.resetScrollbar=function(){this.$body.css(\\\"padding-right\\\",this.originalBodyPad)},i.prototype.measureScrollbar=function(){var t=document.createElement(\\\"div\\\");t.className=\\\"modal-scrollbar-measure\\\",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var o=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function(){return t.fn.modal=o,this},t(document).on(\\\"click.bs.modal.data-api\\\",\'[data-toggle=\\\"modal\\\"]\',function(i){var o=t(this),s=o.attr(\\\"href\\\"),n=t(o.attr(\\\"data-target\\\")||s&&s.replace(\\/.*(?=#[^\\\\s]+$)\\/,\\\"\\\")),r=n.data(\\\"bs.modal\\\")?\\\"toggle\\\":t.extend({remote:!\\/#\\/.test(s)&&s},n.data(),o.data());o.is(\\\"a\\\")&&i.preventDefault(),n.one(\\\"show.bs.modal\\\",function(t){t.isDefaultPrevented()||n.one(\\\"hidden.bs.modal\\\",function(){o.is(\\\":visible\\\")&&o.trigger(\\\"focus\\\")})}),e.call(n,r,this)})}(jQuery),+function(t){\\\"use strict\\\";function e(){var t=document.createElement(\\\"bootstrap\\\"),e={WebkitTransition:\\\"webkitTransitionEnd\\\",MozTransition:\\\"transitionend\\\",OTransition:\\\"oTransitionEnd otransitionend\\\",transition:\\\"transitionend\\\"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,o=this;t(this).one(\\\"bsTransitionEnd\\\",function(){i=!0});var s=function(){i||t(o).trigger(t.support.transition.end)};return setTimeout(s,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery);\\n    }\\n<\\/script>\"'));

$body.append('<div class="spicegems_cr_modal fade" id="sg_country_redirect_mod" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">\n    <div class="spicegems_cr_modal-dialog">\n        <div class="spicegems_cr_modal-content">\n            <div class="spicegems_cr_modal-header">\n                <div class="spicegems_cr_modal-title" id="spicegems_cr_myModalLabel"></div>\n            </div>\n            <div class="spicegems_cr_modal-body">\n\n                <div id="spicegems_cr_mod_sitelogo" style="display: none">\n                    <img id="sg_cbr_box_image" src="" class="sg_cbr_img-responsive">\n                </div>\n\n                <msg id="spicegems_cr_mod_msg"></msg>\n            </div>\n            <div class="spicegems_cr_modal-footer">\n                <a href="javascript:void(0)" class="spicegems_cr_main-btn" id="spicegems_cr_btn_yes"></a>\n                <a href="javascript:void(0)" class="spicegems_cr_main-btn" id="spicegems_cr_btn_no"></a>\n            </div>\n\n\n\n\n\n        </div>\n        \n    </div>\n</div>');

$(document).find("#sg_country_redirect_mod").modal();

eleSelector = $body.find("#sg_country_redirect_mod");
eleSelector.find("#spicegems_cr_myModalLabel").html(all_data['popup_box_title']);

if(all_data['popup_box_img_enable']==1)
{
eleSelector.find("#sg_cbr_box_image").attr("src",all_data['popup_box_img']);
eleSelector.find("#spicegems_cr_mod_sitelogo").show();
}

REDIRECTO.barAndModelDefaultData(eleSelector, all_data)
}
else if(message_show_option=='top_banner')
{

$body.append(JSON.parse('\"<style>\\n\\n    \\/*------New Button Style------------------------------------*\\/\\n    .spicegems_cr_main-btn {\\n        color:#fff;\\n        background:#3D9AD1 ;\\n        font-size:14px;\\n        padding:8px 15px;\\n        font-weight: normal;\\n        margin: 6px 0;\\n        border-radius:2px;\\n        display: inline-block;\\n        text-decoration: none;\\n        font-family: \'Open Sans\', sans-serif;\\n        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        transition: all 0.3s ease-in-out 0s;\\n        transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\\n    }\\n\\n    #spicegems_cr_btn_yes{\\n        color:#fff;\\n        background-color:#4caf50;\\n    }\\n    #spicegems_cr_btn_no{\\n        color:#fff;\\n        background-color: #f44336;\\n    }\\n    .spicegems_cr_main-btn:hover, .spicegems_cr_main-btn:active {\\n        color:#fff;\\n        opacity:0.8;\\n    }\\n<\\/style>\\n<style>\\n    \\/*--------Top Bar css------------------*\\/\\n    .spicegems_cr_top_bar{\\n        background-color: #3d9ad1;\\n        color: #fff;\\n        position: fixed;\\n        width: 100%;\\n        opacity: 0.9;\\n        z-index: 400000000;\\n        top: 0;\\n        left: 0;\\n        box-shadow: 0 1px 3px 2px rgba(0,0,0,0.15);\\n        padding: 6px 0;\\n    }\\n\\n    .spicegems_cr_main-btn {\\n        color:#fff;\\n        background:#3D9AD1 ;\\n        font-size:14px;\\n        padding:7px 14px;\\n        font-weight: normal;\\n        margin:2px 0;\\n        border-radius:2px;\\n        display: inline-block;\\n        text-decoration: none;\\n        font-family: \'Open Sans\', sans-serif;\\n        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        transition: all 0.3s ease-in-out 0s;\\n        transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\\n    }\\n\\n    #spicegems_cr_mod_msg{\\n        text-align:center;\\n        font-family: sans-serif;\\n        color:#fff;\\n        font-size:18px;\\n        line-height:30px;\\n        letter-spacing: 0.3px;\\n        text-shadow: 0px 2px 3px rgba(0,0,0,0.2);\\n    }\\n    #spicegems_cr_btn_yes{\\n      margin-left:15px;\\n    }\\n\\n    .spicegems_cr_top_bar_con-fluid {\\n        padding-right: 15px;\\n        padding-left: 15px;\\n        margin-right: auto;\\n        margin-left: auto;\\n    }\\n    @media (min-width: 992px) {\\n        .spicegems_cr_col-md-3, .spicegems_cr_col-md-4, .spicegems_cr_col-md-5, .spicegems_cr_col-md-6, .spicegems_cr_col-md-7, .spicegems_cr_col-md-8,.spicegems_cr_col-md-9 {\\n            float: left;\\n        }\\n        .spicegems_cr_col-md-12 {\\n            width: 100%;\\n            text-align: center;\\n        }\\n\\n        .spicegems_cr_col-md-9 {\\n            width: 75%;\\n        }\\n        .spicegems_cr_col-md-8 {\\n            width: 66.66666667%;\\n        }\\n        .spicegems_cr_col-md-7 {\\n            width: 58.33333333%;\\n        }\\n        .spicegems_cr_col-md-6 {\\n            width: 50%;\\n        }\\n<\\/style>\"'));
$body.append('<div class="spicegems_cr_top_bar" id="spicegems_cr_top_bar">\n    <div class="spicegems_cr_top_bar_con-fluid ">\n        <div class="spicegems_cr_col-md-12">\n            <msg id="spicegems_cr_mod_msg"></msg>\n\n            <a  href="javascript:void(0)" class="spicegems_cr_main-btn" id="spicegems_cr_btn_yes"></a>\n            <a  href="javascript:void(0)" class="spicegems_cr_main-btn" id="spicegems_cr_btn_no"></a>\n\n        </div>\n    </div>\n</div>');

eleSelector = $body.find("#spicegems_cr_top_bar");
REDIRECTO.barAndModelDefaultData(eleSelector, all_data)
}
else
{
return false;
}

REDIRECTO.setDefaultData(eleSelector,all_data);
}

function SGCheckjQueryExistOrNot()
{
if(typeof jQuery == 'undefined')
{
console.log('jQuery not exist');
var headTag = document.getElementsByTagName("head")[0];
var jqTag = document.createElement('script');

jqTag.type = 'text/javascript';
jqTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js';

jqTag.onload = SGAfterDocumentReady;
headTag.appendChild(jqTag);
}
else
{
SGAfterDocumentReady();
}
}


if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
SGCheckjQueryExistOrNot();
}
else {
document.addEventListener("DOMContentLoaded", SGCheckjQueryExistOrNot);
}

}

};


REDIRECTO.parseCountry = function(data)
{
if(REDIRECTO.isGoogleBot(data.ua))
{
return true;
}

REDIRECTO.fetchURL(data.country,data.ip);
};




REDIRECTO.isGoogleBot = function(str)
{
str = str.toLowerCase();console.log(str);
var isBot = false;
var allBots = ['googlebot','www.google.com','googlebot-mobile','googlebot-image','googlebot-news', 'googlebot-video','adsbot-google-mobile','adsbot-google', 'feedfetcher-google', 'mediapartners-google','google-adwords-instant','appengine-google', 'google web preview', 'msnbot', 'google search console', 'google-shopping-quality', 'google web preview analytics'];

for(var i = 0; i < allBots.length; i++)
{console.log(str.indexOf(allBots[i]));
if (str.indexOf(allBots[i]) > -1){
isBot = true;
break;
}
}console.log(isBot);
return isBot;
};


function loadCookieJS()
{
if($.cookie===undefined)
{
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function r(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function t(n,o){var i=u.raw?n:r(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(r,c,f){if(void 0!==c&&!e.isFunction(c)){if(f=e.extend({},u.defaults,f),"number"==typeof f.expires){var a=f.expires,d=f.expires=new Date;d.setTime(+d+864e5*a)}return document.cookie=[n(r),"=",i(c),f.expires?"; expires="+f.expires.toUTCString():"",f.path?"; path="+f.path:"",f.domain?"; domain="+f.domain:"",f.secure?"; secure":""].join("")}for(var p=r?void 0:{},s=document.cookie?document.cookie.split("; "):[],m=0,x=s.length;x>m;m++){var v=s[m].split("="),k=o(v.shift()),l=v.join("=");if(r&&r===k){p=t(l,c);break}r||void 0===(l=t(l))||(p[k]=l)}return p};u.defaults={},e.removeCookie=function(n,o){return void 0===e.cookie(n)?!1:(e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n))}});
}
else{
console.log('cookie already exist');
}



$(document).on('click','#spicegems_cr_btn_yes',REDIRECTO.redirect);
$(document).on('click','#spicegems_cr_btn_no',REDIRECTO.closeBox);
}

REDIRECTO.getRelativeURL = function()
{
var $page = window.location;
return $page.pathname + $page.search + $page.hash;
}

function loadSpicegemsCR()
{
var SGCountryRedirectData = [];
SGCountryRedirectData['ip'] = "2.139.177.144";

SGCountryRedirectData['country'] = "ES";
SGCountryRedirectData['ua'] = "Mozilla/4.5 (compatible; HTTrack 3.0x; Windows 98)";

REDIRECTO.parseCountry(SGCountryRedirectData);
}
loadSpicegemsCR();

}

function inIframe () {
try {
return window.location.href == window.top.location.href;
} catch (e) {
return true;
}
}

if(window.spiceScriptLoaded === undefined && inIframe() ===true)
{
SGRedirecto();
window.spiceScriptLoaded = true;
}