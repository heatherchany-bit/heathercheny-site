(function(){
  var S=window.SITE||{};
  document.querySelectorAll("[data-site]").forEach(function(el){var v=S[el.getAttribute("data-site")];if(v)el.textContent=v;});
  var wa=document.getElementById("wa");if(wa&&S.whatsapp){wa.style.display="";wa.href="https://wa.me/"+S.whatsapp.replace(/\D/g,"")+"?text="+encodeURIComponent("Hello, I would like to make a request.");}
  var f=document.getElementById("cf");if(!f)return;
  function v(i){return (document.getElementById(i).value||"").trim();}
  f.addEventListener("submit",function(e){
    e.preventDefault();var out=document.getElementById("out");
    if(v("hp"))return;
    if(!v("n")||!v("c")||!v("i")){out.textContent="Please write your name, how to reach you, and the item you want.";return;}
    if(!document.getElementById("a").checked){out.textContent="Please tick the box to confirm you are 18 or older.";return;}
    var text="Name: "+v("n")+"\nContact: "+v("c")+"\nKind: "+v("k")+"\nItem: "+v("i")+"\nBudget: "+v("b")+"\nSend to: "+v("w");
    if(S.web3formsKey){
      var btn=document.getElementById("go");btn.disabled=true;out.textContent="Sending…";
      fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},
        body:JSON.stringify({access_key:S.web3formsKey,subject:"New request from "+v("n"),from_name:(S.brand||"Website"),name:v("n"),email:v("c").indexOf("@")>0?v("c"):undefined,message:text})})
      .then(function(r){return r.json();}).then(function(j){
        if(j.success){f.style.display="none";document.getElementById("done").style.display="block";}
        else{btn.disabled=false;out.textContent="Sorry, it did not send. Please try again, or message us another way.";}})
      .catch(function(){btn.disabled=false;out.textContent="Sorry, it did not send. Please check your internet and try again.";});
    }else if(S.email){
      out.textContent="Opening your email app… If nothing opens, email us at "+S.email+" and paste your message.";
      location.href="mailto:"+S.email+"?subject="+encodeURIComponent("Request from "+v("n"))+"&body="+encodeURIComponent(text);
    }else{out.textContent="The agency email is not set yet. (Owner: open config.js and add the email.)";}
  });
})();
