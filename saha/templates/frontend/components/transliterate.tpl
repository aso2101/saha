<div class="dropdown mx-auto my-3" style="width:4rem;">
  <button class="btn btn-sm btn-grey dropdown-toggle" type="button" id="transliterationButton" data-toggle="dropdown" title="Transliteration options" aria-haspopup="true" aria-expanded="false">
    <img src="{$baseUrl}/plugins/themes/saha/images/transliterate.svg" width="20px"/>
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
