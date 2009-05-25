// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone

String.prototype.namespace = function(separator)
{
	var ns = this.split(separator || '.'), o = window, i, len;
	for (i = 0, len = ns.length; i < len; i++)
	{
		o = o[ns[i]] = o[ns[i]] || {};
	}
	return o;
}

//Creo i namespace per l'estensione
"it.neurone.gladiatustools".namespace();