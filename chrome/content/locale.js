// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone
// @version         2.0.0
// @date            07 Feb 2009

it.neurone.gladiatustools.locale = {
    //Default in inglese
    language : "",
    simulationFailed : "",
    customAvatarUrl : "",
    simulate : "",
    simulating : "",
    winning : " ",
    go : "",
    stop : "",
    quest : "",
    arena : "",
    work : "",
    completed : "",
    winPercentage : "",
    totalEarnedGold : "",
    /********************************
    / Recupera la lingua in base al sito
    /********************************/
    getLanguage : function(hostname) {
        var paesi = new Array
        (
            new Array("Argentina", /s\d+\.ar\.gladiatus\.com/i, "spagnolo"),
            new Array("Bielorussia", ".gladiatus.by", "russo"),
            new Array("Brasile", ".br.gladiatus.com", "portoghese"),
            new Array("Bulgaria", ".bg.gladiatus.com", "bulgaro"),
            new Array("Cile", ".gladiatus.cl", "spagnolo"),
            new Array("Cina", ".gladiatus.cn.com", "cinese"),
            new Array("Colombia", ".co.gladiatus.com", "spagnolo"),
            new Array("Repubblica Ceca", ".gladiatus.cz", "ceco"),
            new Array("Danimarca", ".gladiatus.dk", "danese"),
            new Array("Inghilterra", /s\d+\.gladiatus\.com/i, "inglese"),
            new Array("Estonia", ".ee.gladiatus.com", "estone"),
            new Array("Finlandia", ".fi.gladiatus.com", "finlandese"),
            new Array("Francia", ".gladiatus.fr", "francese"),
            new Array("Germania", ".gladiatus.de", "tedesco"),
            new Array("Grecia", ".gladiatus.gr", "greco"),
            new Array("Ungheria", ".gladiatus.hu", "ungherese"),
            new Array("Indonesia", ".id.gladiatus.com", "indonesiano"),
            new Array("Israele", ".gladiatus.co.il", "ebraico"),
            new Array("Italia", ".gladiatus.it", "italiano"),
            new Array("Korea", ".kr.gladiatus.com", "coreano"),
            new Array("Lettonia", ".gladiatus.lv", "lettone"),
            new Array("Lituania", ".gladiatus.lt", "lituano"),
            new Array("Messico", ".gladiatus.com.mx", "spagnolo"),
            new Array("Paesi Bassi", ".gladiatus.nl", "olandese"),
            new Array("Norvegia", ".gladiatus.no", "norvegese"),
            new Array("Peru", ".gladiatus.pe", "spagnolo"),
            new Array("Filippine", ".gladiatus.ph", "filippino"),
            new Array("Polonia", ".gladiatus.pl", "polacco"),
            new Array("Portogallo", ".gladiatus.com.pt", "portoghese"),
            new Array("Romania", ".gladiatus.ro", "rumeno"),	            
            new Array("Russia", ".gladiatus.ru", "russo"),
            new Array("Slovacchia", ".gladiatus.sk", "slovacco"),
            new Array("Spagna", ".gladiatus.es", "spagnolo"),
            new Array("Svezia", ".gladiatus.se", "svedese"),
            new Array("Taiwan", ".gladiatus.tw", "cinese"),
            new Array("Tailandia", ".th.gladiatus.com", "thai"),
            new Array("Turchia", ".gladiatus.net", "turco"),
            new Array("Ucraina", ".gladiatus.com.ua", "ucraino"),
            new Array("Emirati Arabi Uniti", /s\d+\.ae\.gladiatus\.com/i, "arabo"),
            new Array("USA", ".gladiatus.us", "inglese"),
            new Array("Venezuela", ".gladiatus.com.ve", "spagnolo"),
            new Array("Vietnam", ".gladiatus.vn", "vietnamita")
        );

        for (var paese in paesi)
        {
            if(hostname.match(paesi[paese][1]))
            {
                return paesi[paese][2];
            }
        }
                
        return "inglese";
    },
    
    /*********************************
    / Inizializza la lingua corretta
    /********************************/
    init : function(hostname) {
        with(this) {
            var language = getLanguage(hostname)
            //alert("host:" + hostname + ", lingua: " + language);
            switch(language)
            {
                case "arabo":
                    this.simulationFailed = "المحاكاة فشلت! حاول مرة اخرى او اختر محاكي اخر من الخيارات";
                    this.customAvatarUrl = "يجب وضع وصلة الصورة الشخصية كاملة مع http:// وستصغر الصورة تلقائيا الى 168x194";
                    this.simulate = "محاكاة";
                    this.simulating = "جاري المحاكاة...";
                    this.winning = "الفوز";
                    this.go = "اهجم!";
                    this.stop = "توقف!";
                    this.quest = "الحانة:";
                    this.arena = "الساحة:";
                    this.work = "الأسطبل:";
                    this.completed = "تم!";
                    this.winPercentage = "نسبة الإنتصارات";
                    this.totalEarnedGold = "مجموع الحصول على الذهب";
                    break;
            
                case "spagnolo":
                    this.simulationFailed = "La simulación falló! Por favor intenta mas tarde o selecciona otro motor de simulación en las opciones de Gladiatus Tools.";
                    this.customAvatarUrl = "URL absoluta del avatar personalizado (http://...). La imagen será redimensionada a 168x194.";
                    this.simulate = "Simular";
                    this.simulating = "Simulando...";
                    this.winning = "Victoria ";
                    this.go = "Ir!";
                    this.stop = "NO!";
                    this.quest = "Expedición:";
                    this.arena = "Arena:";
                    this.work = "Trabajo:";
                    this.completed = "Terminado!";
                    this.winPercentage = "Porcentaje de victorias";
                    this.totalEarnedGold = "Total de oro ganado";
                    break; 
                    
                case "francese":
                    this.simulationFailed = "La simulation a échoué! Réessayez plus tard ou sélectionnez un autre moteur de simulation.";
                    this.customAvatarUrl = "URL de l’avatar personalisé (http://...). L’image sera redimensionnée en 168x194.";
                    this.simulate = "Simuler";
                    this.simulating = "Simulation en cours...";
                    this.winning = "Gagnant à ";
                    this.go = "Go!";
                    this.stop = "STOP!";
                    this.quest = "Expédition:";
                    this.arena = "Arène:";
                    this.work = "Étable:";
                    this.completed = "Terminé!";
                    this.winPercentage = "Pourcentage de victoire";
                    this.totalEarnedGold = "Bénéfice";
                    break;  
                      
                    
                case "italiano":                
                    this.simulationFailed = "Simulazione fallita! Prova più tardi oppure seleziona un'altro motore di simulazione dal menu delle opzioni di Gladiatus Tools.";
                    this.customAvatarUrl = "Url assoluta dell'avatar personalizzato (http://...). L'immagine verrà ridimensionata a 168x194.";
                    this.simulate = "Simula";
                    this.simulating = "Simulazione...";
                    this.winning = "Vincente ";
                    this.go = "Vai!";
                    this.stop = "ALT!";
                    this.quest = "Spedizione:";
                    this.arena = "Arena:";
                    this.work = "Stalla:";
                    this.completed = "Finito!";
                    this.winPercentage = "Percentuale vittorie";
                    this.totalEarnedGold = "Oro guadagnato";
                    break;
                      
                default:
                    this.simulationFailed = "Simulation faild! Please try later or select another simulator engine from Gladiatus Tools options.";
                    this.customAvatarUrl = "Custom avatar absolute url (http://...). Image will be resized to 168x194.";
                    this.simulate = "Simulate";
                    this.simulating = "Simulating...";
                    this.winning = "Winning ";
                    this.go = "Go!";
                    this.stop = "STOP!";
                    this.quest = "Quest:";
                    this.arena = "Arena:";
                    this.work = "Work:";
                    this.completed = "Complete!";
                    this.winPercentage = "Winning percentage";
                    this.totalEarnedGold = "Total earned gold";
            }
        }
    }
};