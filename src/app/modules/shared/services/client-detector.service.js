"use strict";
(function (OsNames) {
    OsNames[OsNames["Windows"] = 0] = "Windows";
    OsNames[OsNames["WindowsMobile"] = 1] = "WindowsMobile";
    OsNames[OsNames["Android"] = 2] = "Android";
    OsNames[OsNames["OpenBSD"] = 3] = "OpenBSD";
    OsNames[OsNames["SunOs"] = 4] = "SunOs";
    OsNames[OsNames["Linux"] = 5] = "Linux";
    OsNames[OsNames["iOS"] = 6] = "iOS";
    OsNames[OsNames["MacOs"] = 7] = "MacOs";
    OsNames[OsNames["QNX"] = 8] = "QNX";
    OsNames[OsNames["UNIX"] = 9] = "UNIX";
    OsNames[OsNames["BeOS"] = 10] = "BeOS";
    OsNames[OsNames["OS2"] = 11] = "OS2";
    OsNames[OsNames["SearchBot"] = 12] = "SearchBot";
    OsNames[OsNames["Electron"] = 13] = "Electron";
})(exports.OsNames || (exports.OsNames = {}));
var OsNames = exports.OsNames;
(function (ClientNames) {
    ClientNames[ClientNames["Chrome"] = 0] = "Chrome";
    ClientNames[ClientNames["Safari"] = 1] = "Safari";
    ClientNames[ClientNames["Firefox"] = 2] = "Firefox";
    ClientNames[ClientNames["IE"] = 3] = "IE";
    ClientNames[ClientNames["Edge"] = 4] = "Edge";
    ClientNames[ClientNames["Opera"] = 5] = "Opera";
    ClientNames[ClientNames["Electron"] = 6] = "Electron";
})(exports.ClientNames || (exports.ClientNames = {}));
var ClientNames = exports.ClientNames;
class ClientDetector {
    static test(array) {
        let result = {};
        array.forEach((osItem) => {
            if (osItem.r.test(navigator.userAgent) && !result.name) {
                result.name = osItem.s;
                result.version = osItem.v;
            }
        });
        return result;
    }
    static getOs() {
        return ClientDetector.test(ClientDetector.osStrings);
    }
    static getClient() {
        return ClientDetector.test(ClientDetector.clientStrings);
    }
    static isMobileDevice() {
        return ClientDetector.getOs().name === OsNames.Android ||
            ClientDetector.getOs().name === OsNames.iOS ||
            ClientDetector.getOs().name === OsNames.WindowsMobile;
    }
    static isPhone() {
        return ClientDetector.isMobileDevice() && window.screen.width < 770;
    }
}
ClientDetector.osStrings = [
    { s: OsNames.Windows, v: 10, r: /(Windows 10.0|Windows NT 10.0)/ },
    { s: OsNames.Windows, v: 8.1, r: /(Windows 8.1|Windows NT 6.3)/ },
    { s: OsNames.Windows, v: 8, r: /(Windows 8|Windows NT 6.2)/ },
    { s: OsNames.Windows, v: 7, r: /(Windows 7|Windows NT 6.1)/ },
    { s: OsNames.Windows, v: 6, r: /Windows NT 6.0/ },
    { s: OsNames.Windows, v: 0, r: /Windows NT 5.2/ },
    { s: OsNames.Windows, v: 0, r: /(Windows NT 5.1|Windows XP)/ },
    { s: OsNames.Windows, v: 0, r: /(Windows NT 5.0|Windows 2000)/ },
    { s: OsNames.Windows, v: 0, r: /(Win 9x 4.90|Windows ME)/ },
    { s: OsNames.Windows, v: 0, r: /(Windows 98|Win98)/ },
    { s: OsNames.Windows, v: 0, r: /(Windows 95|Win95|Windows_95)/ },
    { s: OsNames.Windows, v: 0, r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
    { s: OsNames.Windows, v: 0, r: /Windows CE/ },
    { s: OsNames.Windows, v: 0, r: /Win16/ },
    { s: OsNames.WindowsMobile, v: 0, r: /Windows Phone|iemobile/ },
    { s: OsNames.Android, v: 0, r: /Android/ },
    { s: OsNames.OpenBSD, v: 0, r: /OpenBSD/ },
    { s: OsNames.SunOs, v: 0, r: /SunOS/ },
    { s: OsNames.Linux, v: 0, r: /(Linux|X11)/ },
    { s: OsNames.iOS, v: 0, r: /(iPhone|iPad|iPod)/ },
    { s: OsNames.MacOs, v: 10, r: /Mac OS X/ },
    { s: OsNames.MacOs, v: 0, r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
    { s: OsNames.QNX, v: 0, r: /QNX/ },
    { s: OsNames.UNIX, v: 0, r: /UNIX/ },
    { s: OsNames.BeOS, v: 0, r: /BeOS/ },
    { s: OsNames.OS2, v: 0, r: /OS\/2/ },
    { s: OsNames.SearchBot, v: 0, r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ },
    { s: OsNames.Electron, v: 0, r: /Electron/ }
];
ClientDetector.clientStrings = [
    { s: ClientNames.Electron, r: /Electron/ },
    { s: ClientNames.Chrome, r: /Chrome/ },
    { s: ClientNames.Safari, r: /Safari/ },
    { s: ClientNames.Firefox, r: /Firefox/ },
    { s: ClientNames.IE, r: /(MSIE|Trident)/ },
    { s: ClientNames.Edge, r: /Edge/ },
    { s: ClientNames.Opera, r: /OPR/ }
];
exports.ClientDetector = ClientDetector;
//# sourceMappingURL=client-detector.service.js.map