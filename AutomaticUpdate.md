## Introduction ##

Around the web there are currently two GT addon versions, one from [AMO](https://addons.mozilla.org/en-US/firefox/addon/9761/) and the other one from Google Code (the same one existing at my blog). Each version has its own automatic update mechanism, and here you will understand why.


## Details ##

AMO is a very prolific community, and there you can find every Firefox addons you can desire. They provide a very good tools set for developers and they offer an automatic addons update also. When your Firefox needs to check updates for your installed addons, it usually contact the AMO site for that. On the other hand, AMO developers (and AMO volunteers) will check **every** addons update before publishing it, and sometimes the entire process takes weeks, or in the worst case months, to be completed.

Luckily, Firefox supports another automatic addons update mechanism, without the need to contact AMO. In this case, the install manifest must point to a _signed update manifest_ (look inside [install.rdf](http://code.google.com/p/gladiatus-tools/source/browse/trunk/install.rdf), line 7 points to http://www.neurone.it/mozilla/addons/gladiatustools/signedupdate.rdf).
The signed update manifest contains information about the _latest addon version_, the url to the _latest xpi file_ and, for security reason, the _xpi file hash_ also.

This way, you are free to publish your addon updates very fast, but you must take care of the correct packaging and all the update mechanism.

From the beginning, I chose to use both mechanisms: if you want the lastest release very fast, download GT from Google Code. If you prefer to wait for AMO approval (because you think it's safer or simply you like them more then us), install Gladiatus Tools from its own [AMO page](https://addons.mozilla.org/en-US/firefox/addon/9761/).