var ekavaliScript = localStorage.getItem("ekavaliScript");
var ekavaliTranslit = localStorage.getItem("ekavaliTranslit");

function setTransliterationOptions() {
  if (ekavaliTranslit !== null) {
    var translitMenuItem = $("#"+ekavaliTranslit);
    translitMenuItem.addClass("active");
  } else { // Default to only Indic
    $("#translitOnlyIndic").addClass("active");
    ekavaliTranslit = "translitOnlyIndic";
    localStorage.setItem("ekavaliTranslit","translitOnlyIndic");
  }
};
function setScriptMenu() {
  if (ekavaliScript !== null) {
    var scriptElement = $("#script-"+ekavaliScript);
    scriptElement.addClass("active");
  } else { // default to Devanagari
    $("#script-Deva").addClass("active");
    ekavaliScript = "Deva";
    localStorage.setItem("ekavaliScript","Deva");
  }
};
function transliterate() {
  translit(ekavaliScript);
}

function addHiddenElements() {
  $(document).find(".translit,.translit-tamil").each(function() {
    var translit = $(this),
    copy = translit.clone();
    copy.removeClass().addClass("d-none copy");
    translit.append(copy);
  });
}

// when a link from the script menu is clicked,
// indicScript is called, with the script as a parameter.
function indicScript(element) {
  var s = element.id.replace("script-","");
  $(".scriptSelector").removeClass("active");
  localStorage.setItem("ekavaliScript",s);
  ekavaliScript = s;
  $(element).addClass("active");
  translit(ekavaliScript);
}
function translitOptions(element) {
  var t = element.id;
  $(".translitSelector").removeClass("active");
  localStorage.setItem("ekavaliTranslit",t);
  ekavaliTranslit = t;
  $(element).addClass("active");
  translit(ekavaliScript);
}
function translitTamil(element) {
  var t = element.id;
  $(".translitSelector").removeClass("active");
  localStorage.setItem("ekavaliTranslit",t);
  ekavaliTranslit = t;
  $(element).addClass("active");
  transliterateTamil();
}

// the transliteration function takes the name of the script
// (in ISO codes) as a parameter. it also looks at the local
// variable ekavaliTranslit for the transliteration options.
function translit(input) {
  var sanscriptNames = {
    "Deva":"devanagari",
    "Knda":"kannada",
    "Telu":"telugu",
    "Beng":"bengali",
    "Mlym":"malayalam",
    "Bali":"balinese",
    "Gujr":"gujarati",
    "Gran":"grantha"
  };
  var text, preprocessed, transliterated, transliteratedescaped, original, originalescaped, newelement;
  // the first routine is for the class translit-only-indic.
  $(".translit-only-indic").each(function() {
    original = $(this).attr("data-original");
    if ($(this).is('[data-original]')) {
      original = $(this).attr("data-original");

    } else {
      original = $(this).text();
      $(this).attr("data-original",original);
    }
    text = preprocessSanscript(input,original.toLowerCase());
    transliterated = Sanscript.t(text,"iso",sanscriptNames[input]);
    $(this).html("<span class='"+input+"'>"+transliterated+"</span>");
  });
  $(".translit,.translit-tamil").each(function() {
    var original;
    // make sure that no unescaped HTML tags go into data-original!
    if ($(this).is('[data-original]')) {
      original = $(this).attr("data-original");
    } else {
      original = $(this).prop('innerHTML');
    }
    var unescapedoriginal = original.replace(/&gt;/g,">")
    .replace(/&lt;/g,"<")
    .replace(/&quot;/g,"'"),
    escapedoriginal = original.replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/'/g,"&quot;")
    .replace(/"/g,"&quot;"),
    forIndic = unescapedoriginal.replace(/<span class=('|")pron('|")>([^<])<\/span>/g,"$3") // remove span.pron
    .replace(/<span class=('|")anu('|")>([^<])<\/span>/g,"$3") // remove span.anu
    .replace(/</g,"##<")
    .replace(/>/g,">##")
    .replace(/&nbsp;/g,"##&nbsp;##")
    .replace(/~~/g,"##~~##") // used in meter.js
    .replace(/~/g,"##~##"), // used in meter.js
    forRoman = unescapedoriginal;
    $(this).attr("data-original",escapedoriginal);
    text = preprocessSanscript(input,forIndic.toLowerCase());
    if ($(this).is('.translit-tamil')) {
      transliterated = Sanscript.t(text,"iso","tamil");
    } else {
      transliterated = Sanscript.t(text,"iso",sanscriptNames[input]);
    }
    transliteratedescaped = transliterated.replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/'/g,"&quot;")
    .replace(/"/g,"&quot;");
    if (ekavaliTranslit == "translitOnlyIndic") { // only indic
      if ($(this).is('.translit-tamil')) {
        $(this).html("<span class='Taml'>"+transliterated+"</span>");
      } else {
        $(this).html("<span class='"+input+"'>"+transliterated+"</span>");
      }
    } else if (ekavaliTranslit == "translitOnlyRoman") { // only roman
      $(this).html("<span class='Latn'>"+forRoman+"</span>");
    } else if (ekavaliTranslit == "translitRomanIndic") { // roman then indic
      $(this).html("<span class='Latn'>"+forRoman+"</span> <span class='"+input+"'>"+transliterated+"</span>");
    } else if (ekavaliTranslit == "translitIndicRoman") { // indic then roman
      $(this).html("<span class='"+input+"'>"+transliterated+"</span> <span class='Latn'>"+original+"</span>");
    } else if (ekavaliTranslit == "translitIndicRomanTooltips") {
      $(this).html("<span class='"+input+" translittooltips' data-toggle='tooltip' title='<span class=\"Latn\">"+escapedoriginal+"</span>'>"+transliterated+"</span>");
    } else if (ekavaliTranslit == "translitRomanIndicTooltips") {
      $(this).html("<span class='Latn translittooltips' data-toggle='tooltip' title='<span class=\""+input+"\">"+transliteratedescaped+"</span>'>"+original+"</span>");
    }
  });
  // reinitialize the tooltips
  $('[data-toggle="tooltip"]').tooltip({html:true});
  punctuate();
  smoothScroll();
}

// For Tamil, there is only one Indic script.
function transliterateTamil() {
  var text, preprocessed, transliterated, transliteratedescaped, original, originalescaped, newelement;
  // the first routine is for the class translit-only-indic.
  // these are elements
  $(".translit-only-indic").each(function() {
    original = $(this).attr("data-original");
    if ($(this).is('[data-original]')) {
      original = $(this).attr("data-original");

    } else {
      original = $(this).text();
      $(this).attr("data-original",original);
    }
    text = preprocessSanscript("Taml",original.toLowerCase());
    transliterated = Sanscript.t(text,"iso","tamil");
    $(this).html("<span class='Taml'>"+transliterated+"</span>");
  });
  $(".translit").each(function() {
    // each element is transliterated, according to the
    // options held in ekavaliTranslit.
    original = $(this).attr("data-original");
    // make sure that no unescaped HTML tags go into data-original!
    if ($(this).is('[data-original]')) {
      original = $(this).attr("data-original");
    } else {
      original = $(this).prop('innerHTML').replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/'/g,"&quot;")
      .replace(/"/g,"&quot;");
    }
    originalescaped = original;
    $(this).attr("data-original",original);
    // don't transliterate html tags!
    // we restore them now and escape them with ##
    original = original.replace(/&lt;/g,"##<")
    .replace(/&gt;/g,">##")
    .replace(/&quot;/g,"'")
    .replace(/&nbsp;/g,"##&nbsp;##")
    .replace(/~~/g,"##~~##") // used in meter.js
    .replace(/~/g,"##~##"); // used in meter.js
    text = preprocessSanscript("Taml",original.toLowerCase());
    transliterated = Sanscript.t(text,"iso","tamil");
    transliteratedescaped = transliterated.replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/'/g,"&quot;")
    .replace(/"/g,"&quot;");
    // then, for the romanized text, remove the ##
    original = original.replace(/##/g,"");
    if (ekavaliTranslit == "translitOnlyIndic") { // only indic
      $(this).html("<span class='Taml'>"+transliterated+"</span>");
    } else if (ekavaliTranslit == "translitOnlyRoman") { // only roman
      $(this).html("<span class='Latn'>"+original+"</span>");
    } else if (ekavaliTranslit == "translitRomanIndic") { // roman then indic
      $(this).html("<span class='Latn'>"+original+"</span> <span class='Taml'>"+transliterated+"</span>");
    } else if (ekavaliTranslit == "translitIndicRoman") { // indic then roman
      $(this).html("<span class='Taml'>"+transliterated+"</span> <span class='Latn'>"+original+"</span>");
    } else if (ekavaliTranslit == "translitIndicRomanTooltips") {
      $(this).html("<span class='Taml translittooltips' data-toggle='tooltip' title='<span class=\"Latn\">"+originalescaped+"</span>'>"+transliterated+"</span>");
    } else if (ekavaliTranslit == "translitRomanIndicTooltips") {
      $(this).html("<span class='Latn translittooltips' data-toggle='tooltip' title='<span class=\"Taml\">"+transliteratedescaped+"</span>'>"+original+"</span>");
    }
  });
  // reinitialize the tooltips
  $('[data-toggle="tooltip"]').tooltip({html:true});
}

// Preprocess strings from ISO to Devanāgarī.
function preprocessSanscript(script,x) {
  /* generic routines to remove spaces */
  var res = x.split("##"),
  out = [];
  res.forEach(function(item, index) {
    if (item.startsWith("<")) {
      out.push(item);
    } else {
      var trans = item.replace(/ ’/g,"'")
      .replace(/’/g,"'")
      .replace(/aï/g,"a####i")
      .replace(/aü/g,"a####u")
      .replace(/([rnmdg]) ([gṅjñḍṇdnbmhyvrlaāiīuūeēoō])/g,"$1$2")
      .replace(/([kcṭtpśsṣ]) ([kcṭtpśsṣ])/g,"$1$2")
      .replace(/([vy]) ([aāiīuūēeōo])/g,"$1$2")
      .replace(/ \|\|/g," ॥")
      .replace(/ \|/g," ।");
      trans = removeAccents(trans);
      if (script == "Knda") {
        trans = trans.replace(/([aāiīuūr̥eēoō])([ṅñṇnm])([kgcjṭḍtdpbyvrlśṣs])/g,"$1ṁ$3");
      }
      if (script == "Telu") {
        trans = trans.replace(/([aāiīuūr̥eēoō])([ṅñṇnm])([kgcjṭḍtdpbyvrlśṣs])/g,"$1ṁ$3")
        .replace(/([kgcjṭḍtdpbyvrlśṣs])([ḷ])/g,"$1l")
        .replace(/([ṇ])([ṇ])/g,"$1n");
      }
      if (script == "Latn") {
        if ($(this).parent().hasClass("l")) {
          x = $(this).text().replace(/\u007c\u007c/g,'~')
          .replace(/\u007c/g,'~')
          .replace(/\|/g,'~');
        } else {
          x = $(this).text().replace(/\s+\u007c\u007c/g,'. ~')
          .replace(/\|\|/g,'. ~')
          .replace(/\s+\u007c/g,'.')
          .replace(/\|/g,'.');
        }
      }
      out.push(trans);
    }
  });
  out = out.join("##");
  return out;
};

function removeAccents(string) {
  var output = string.replace(/á/g,"a")
  .replace(/à/g,"a")
  .replace(/ā`/g,"ā")
  .replace(/ā́/g,"ā")
  .replace(/ā́/g,"ā")
  .replace(/ḗ/g,"ē")
  .replace(/ē`/g,"ē")
  .replace(/ō`/g,"ō")
  .replace(/ō´/g,"ō")
  .replace(/ṓ/g,"ō")
  .replace(/ṑ/g,"ō")
  .replace(/ṓ/g,"ō")
  .replace(/í/g,"i")
  .replace(/ì/g,"i")
  .replace(/ī́/g,"ī")
  .replace(/ī́/g,"ī")
  .replace(/ī`/g,"ī")
  .replace(/ú/g,"u")
  .replace(/ù/g,"u")
  .replace(/ū`/g,"ū")
  .replace(/ū́/g,"ū")
  .replace(/ū´/g,"ū")
  .replace(/ū́/g,"ū")
  .replace(/ŕ̥/g,"r̥")
  .replace(/ŕ̥/g,"r̥");
  return output;
};

function punctuate() {
  $(".sentence").not(".punct-exclude").each(function(index) {
    if ($(this).text().endsWith('—')) {
    } else {
      $(this).find(".Latn,.Knda,.Telu,.Mlym").append(". ");
      $(this).find(".Deva,.Beng,.Guja").append("। ");
    }
  });
  $(".lg").not(".punct-exclude").each(function(index) {
    var meter = $(this).attr("data-meter");
    if (typeof meter !== typeof undefined && meter !== false) {
      if (meter == "anuṣṭubh" || meter == "āryā") {
        $(this).find(".l:nth-of-type(1)").each(function(index) {
          $(this).find(".Latn,.Knda,.Telu,.Mlym").append('&nbsp;~');
          $(this).find(".Deva,.Beng,.Guja").append('&nbsp;।');
        });
        $(this).find(".l:nth-of-type(2)").each(function(index) {
          $(this).find(".Latn,.Knda,.Telu,.Mlym").append('&nbsp;~~');
          $(this).find(".Deva,.Beng,.Guja").append('&nbsp;॥');
        });
      } else {
        $(this).find(".l:nth-of-type(2)").each(function(index) {
          $(this).find(".Latn,.Knda,.Telu,.Mlym").append('&nbsp;~');
          $(this).find(".Deva,.Beng,.Guja").append('&nbsp;।');
        });
        $(this).find(".l:nth-of-type(4)").each(function(index) {
          $(this).find(".Latn,.Knda,.Telu,.Mlym").append('&nbsp;~~');
          $(this).find(".Deva,.Beng,.Guja").append('&nbsp;॥');
        });
      }
    } else {
      var padas = $(this).find(".l").length;
      if (padas == 4) {
        $(this).find(".l:nth-of-type(2)").each(function(index) {
          $(this).find(".Latn,.Knda,.Telu,.Mlym").append('&nbsp;~');
          $(this).find(".Deva,.Beng,.Guja").append('&nbsp;।');
        });
        $(this).find(".l:nth-of-type(4)").each(function(index) {
          $(this).find(".Latn,.Knda,.Telu,.Mlym").append('&nbsp;~~');
          $(this).find(".Deva,.Beng,.Guja").append('&nbsp;॥');
        });
      } else if (padas == 2) {
        $(this).find(".l:nth-of-type(1)").each(function(index) {
          $(this).find(".Latn,.Knda,.Telu,.Mlym").append('&nbsp;~');
          $(this).find(".Deva,.Beng,.Guja").append('&nbsp;।');
        });
        $(this).find(".l:nth-of-type(2)").each(function(index) {
          $(this).find(".Latn,.Knda,.Telu,.Mlym").append('&nbsp;~~');
          $(this).find(".Deva,.Beng,.Guja").append('&nbsp;॥');
        });
      }
    }
  });
}

function smoothScroll() {
  $("a[href^='#'], a[href^='index.html#']").on('click',function(e) {
    e.preventDefault();
    var path = window.location.pathname,
    page = path.split("/").pop(),
    offset = 0,
    target = this.hash,
    navbarheight = $('.navbar').height() + 30;
    if ($(this).attr("href").startsWith(page)) {
      if ($(this).data('offset') != undefined) offset = $(this).data('offset');
      $('html, body').stop().animate({
        'scrollTop': $(target).offset().top - offset - navbarheight
      }, 500, 'swing', function() {
        //window.location.hash = target;
      });
    } else {
      if ($(this).attr("href") != "#") {
        window.location.href = $(this).attr("href");
      }
    }
  });
}

function attachToHeader () {
  const css = `
    <style>
      #transliterationButton {
        border: 2px black solid;
        background-color: #ede3cc;
        mid-width: 36px !important;
      }
      #transliterationButton:focus {
        box-shadow: 0 0 0 0.2rem #ede3cc;
      }
      .dropdown-menu-twocolumn {
        line-height: 1.75rem;
        width: 550px !important;
        padding-top: 0;
        margin-top: 0;
        padding-bottom: 0;
      }
      .dropdown-menu-twocolumn div.col-sm-6:first-child {
        padding-right: 0;
        border-right: 1px black solid;
      }
      .dropdown-menu-twocolumn div.col-sm-6:nth-child(2) {
        padding-left: 0;
      }
      .dropdown-menu-twocolumn .dropdown-item {
        padding: 0.2rem 0.5rem;
      }
      .dropdown-menu-twocolumn .dropdown-item.active, .dropdown-menu-twocolumn .dropdown-item:hover {
        color: black !important;
        background-color: #ede3cc !important;
      }
      .dropdown-menu-twocolumn .dropdown-item.active .text-muted, .dropdown-menu-twocolumn .dropdown-item:hover .text-muted {
        color: black !important;
      }
      .dropdown-menu-twocolumn .dropdown-item:active {
        background-color: #ede3cc !important;
        color: white !important;
      }
      .dropdown-menu-twocolumn .dropdown-item:active .text-muted {
        color: white !important;
      }
      .dropdown-menu-twocolumn #scripts-info, .dropdown-menu-twocolumn #options-info {
        text-align: center;
        font-weight: bold;
        color: black;
        margin-bottom: 0.25rem;
      }
    </style>
  `;

  const html = `
    <div class="dropdown mx-auto my-3" style="width:4rem;">
      <button class="btn btn-sm btn-grey dropdown-toggle" type="button" id="transliterationButton" data-toggle="dropdown" title="Transliteration options" aria-haspopup="true" aria-expanded="false">
        <img src="/plugins/themes/saha/images/transliterate.svg" width="20px"/>
      </button>
      <div class="dropdown-menu dropdown-menu-right dropdown-menu-twocolumn" aria-labelledby="transliterationButton">
        <div class="row">
          <div class="col-md-6">
            <a class="dropdown-item disabled" id="options-info">Transliteration options</a>
            <a class="dropdown-item translitSelector" href="javascript:void(0);" id="translitOnlyIndic" onclick="translitOptions(this)">
              <div class="d-flex justify-content-between align-items-center">
                <span class="translit-only-indic" data-original="vāk">vāk</span>
                <small><span class="text-muted">Indic text</span></small>
              </div>
            </a>
            <a class="dropdown-item translitSelector" href="javascript:void(0);" id="translitOnlyRoman" onclick="translitOptions(this)">
              <div class="d-flex justify-content-between align-items-center">
                <i>vāk</i>
                <div><small><span class="text-muted">Roman text</span></small></div>
              </div>
            </a>
            <a class="dropdown-item translitSelector" href="javascript:void(0);" id="translitRomanIndic" onclick="translitOptions(this)" >
              <div class="d-flex justify-content-between align-items-center">
                <span><i>vāk</i> <span class="translit-only-indic" data-original="vāk">vāk</span></span>
                <small><span class="text-muted">Roman + Indic</span></small>
              </div>
            </a>
            <a class="dropdown-item translitSelector" href="javascript:void(0);" id="translitIndicRoman" onclick="translitOptions(this)">
              <div class="d-flex justify-content-between align-items-center">
                <span><span class="translit-only-indic" data-original="vāk">vāk</span> <i>vāk</i></span>
                <small><span class="text-muted">Indic + Roman</span></small>
              </div>
            </a>
            <a class="dropdown-item translitSelector" href="javascript:void(0);" id="translitIndicRomanTooltips" onclick="translitOptions(this)">
              <div class="d-flex justify-content-between align-items-center">
                <span style="text-decoration;text-decoration:underline dotted;"><span class="translit-only-indic" data-original="vāk">vāk</span></span>
                <small><span class="text-muted">Indic + Roman tooltips</span></small>
              </div>
            </a>
            <a class="dropdown-item translitSelector" href="javascript:void(0);" id="translitRomanIndicTooltips" onclick="translitOptions(this)">
              <div class="d-flex justify-content-between align-items-center">
                <span><span style="text-decoration;text-decoration:underline dotted;">vāk</span></span>
                <small><span class="text-muted">Roman (Indic tooltips)</span></small>
              </div>
            </a>
          </div>
          <div class="col-md-6">
            <a class="dropdown-item disabled" id="scripts-info">Indic scripts</a>
            <a class="dropdown-item scriptSelector" href="javascript:void(0);" id="script-Deva" onclick="indicScript(this)">
              <div class="d-flex justify-content-between align-items-center">
                <span class="Deva">देवनागरी</span>
                <small><span class="text-muted">Dēvanāgarī</span></small>
              </div>
            </a>
            <a class="dropdown-item scriptSelector" href="javascript:void(0);" id="script-Knda" onclick="indicScript(this)">
              <div class="d-flex justify-content-between align-items-center">
                <span class="Knda">ಕನ್ನಡ</span>
                <small><span class="text-muted">Kannaḍa</span></small>
              </div>
            </a>
            <a class="dropdown-item scriptSelector" href="javascript:void(0);" id="script-Telu" onclick="indicScript(this)">
              <div class="d-flex justify-content-between align-items-center">
                <span>తెలుగు</span>
                <small><span class="text-muted">Telugu</span></small>
              </div>
            </a>
            <a class="dropdown-item scriptSelector" href="javascript:void(0);" id="script-Mlym" onclick="indicScript(this)">
              <div class="d-flex justify-content-between align-items-center">
                <span>മലയാളം</span>
                <small><span class="text-muted">Malayāḷaṁ</span></small>
              </div>
            </a>
            <a class="dropdown-item scriptSelector" href="javascript:void(0);" id="script-Beng" onclick="indicScript(this)">
              <div class="d-flex justify-content-between align-items-center">
                <span>বাংলা</span>
                <small><span class="text-muted">Bāṅlā</span></small>
              </div>
            </a>
            <a class="dropdown-item scriptSelector" href="javascript:void(0);" id="script-Gujr" onclick="indicScript(this)">
              <div class="d-flex justify-content-between align-items-center">
                <span>ગુજરાતી</span>
                <small><span class="text-muted">Gujarātī</span></small>
              </div>
            </a>
            <a class="dropdown-item scriptSelector" href="javascript:void(0);" id="script-Gran" onclick="indicScript(this)">
              <div class="d-flex justify-content-between align-items-center">
                <span class="Gran">𑌗𑍍𑌰𑌨𑍍𑌥</span>
                <small><span class="text-muted">Grantha</span></small>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  // if html page does not yet have the transliterator module
  if ($('header nav .container dropdown').length === 0) {
    $('head').append(css); // inject the CSS styles
    $('header nav .container').append(html); // inject the HTML
  }
}

attachToHeader();
