jQuery(document).ready(function(){jQuery('[data-toggle="offcanvas"]').click(function(){jQuery('.row-offcanvas').toggleClass('active');});jQuery(".dropdown").hover(function(){jQuery(this).find('.dropdown-menu').first().stop(true,true).fadeIn("fast");},function(){jQuery(this).find('.dropdown-menu').first().stop(true,true).fadeOut("fast");});jQuery(window).resize(function(){if(jQuery(window).width()>=980){jQuery('body > div.nus-body-container').removeClass('active');}});jQuery(".dropdown-toggle-link").click(function($){jQuery(this).find('i').toggleClass("down-arrow");jQuery(this).parent().children('ul').toggleClass("open");});});