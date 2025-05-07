jQuery(document).ready(function(){
    jQuery("#pet-finder").on("submit", function(e){
        e.preventDefault();
        var dna_code = jQuery(this).find("[name='keyword']").val();
        if(dna_code=="") return;
        jQuery("#pet-finder-results").html('<div class="c-preloader"><div class="c-line"></div></div>');
        let obj = {action: 'find_pet', keyword: dna_code};
        jQuery.getJSON(PHPVARS.ajaxurl, obj, function(data) {
            console.log(data);
            if(typeof data.error != "undefined"){
                //jQuery("#pet-finder-results").html('<div class="uk-error">'+data.error+'</div>');
            }else{
                if(data.length>0){
                    var elements = "";
                    var rarities = "";
                    var powers = "";
                    for(i=0; i<data[0].elements.length; i++){
                        if(data[0].elements[i].image_icon != false){
                            elements += '<img src="'+data[0].elements[i].image_icon[0]+'" alt="'+data[0].elements[i].name+'" class="pet-card-logo" />';
                        }
                    }
                    for(i=0; i<data[0].rarities.length; i++){
                        if(data[0].rarities[i].image_icon != false){
                            rarities += '<img src="'+data[0].rarities[i].image_icon[0]+'" alt="'+data[0].rarities[i].name+'" class="pet-card-logo" />';
                        }
                    }
                    for(i=0; i<data[0].powers.length; i++){
                        if(data[0].powers[i].image_icon != false){
                            powers += '<img src="'+data[0].powers[i].image_icon[0]+'" alt="'+data[0].powers[i].name+'" class="pet-card-logo" />';
                        }
                    }
                    var petHTML = ''+
                    '<div class="pet-box unloaded" style="background-image:url('+data[0].thumb[0]+');">'+
                    /*
                        '<div class="pet-logo-box">'+
                            '<div class="elements-rarities-row">'+
                                '<div class="elements-col">'+elements+'</div>'+
                                '<div class="rarities-col">'+rarities+'</div>'+
                            '</div>'+
                            '<div class="powers-row">'+powers+'</div>'+
                        '</div>'+
                    */
                        '<div class="pet-data">'+
                            '<h1>'+data[0].post_title+'</h1>'+
                            '<a href="'+data[0].guid+'" class="uk-button uk-button-default">Show more <span class="uk-margin-small-left uk-icon" style="width:12px;" uk-icon="arrow-upright"></span></a>'+
                        '</div>'+
                    '</div>';
                    
                    var img = new Image();
                    img.src = data[0].thumb[0];
                    img.onload = function(){
                        jQuery("#pet-finder-results").html(petHTML);
                        setTimeout(function(){
                            jQuery("#pet-finder-results").find(".pet-box").removeClass("unloaded");
                            window.location.href = "#pet-finder";
                            jQuery("#pet-finder-results").find("a").on("click", function(e){
                                const an = e.target.closest("a");
                                const transition_el = document.querySelector('.transition');
                                const logo = document.getElementById('transition-logo');
                                e.preventDefault();
                                logo.classList.add('is-up');
                                transition_el.classList.add('is-up');
                                setTimeout(() => {
                                    window.location.href = an.getAttribute('href');
                                }, 1350);
                            })
                        },100);
                    }
                }else{
                    jQuery("#pet-finder-results").html('<div class="uk-h2 uk-text-muted uk-text-center">Sorry, no pet found. Try again.</div>');
                }
            }
        });
    });
});