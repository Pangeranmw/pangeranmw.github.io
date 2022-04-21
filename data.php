<?php
  Class Portfolio{
    private $arrayData;
    function setData(){
      $type = array (
        "app_design" => "App Design",
        "web_design" => "Web Desing",
        "logo_design" => "Logo Design",
        "website" => "Website",
        "android_app" => "Android App",
        "desktop_game" => "Desktop Game"
      );
      $toolsLogo = array(
        "figma"=> "assets/ic-figma.svg",
        "js"=> "assets/ic-js.svg",
        "php"=> "assets/ic-php.svg",
        "kotlin"=> "assets/ic-kotlin.svg",
        "java"=> "assets/ic-java.svg",
      );
      $toolsName = array(
        "figma"=> "Figma",
        "js"=> "JavaScript",
        "php"=> "PHP",
        "kotlin"=> "Kotlin",
        "java"=> "Java",
      );
      $this->arrayData = array(
        array(
          "url"=>"https://www.figma.com/file/687pc7lbdzd9SICjifclrk/Field-Booking-(UX-Design-Dicoding)?node-id=0%3A1",
          "class"=>"item",
          "type"=>$type['app_design'],
          "name"=>"Field Booking",
          "image"=>"assets/img-fieldbooking.png",
          "tools" => array(
            array(
              "tools_logo"=> $toolsLogo['figma'],
              "tools_name"=> $toolsName['figma'],
            )
          )
        ),
        array(
          "url"=> "https://indonesiascenerycraft.herokuapp.com/",
          "class"=> "item hide",
          "type"=> $type['website'],
          "name"=> "Indonesia Scenery & Craft",
          "image"=> "assets/img-isc.png",
          "tools" => array(
            array(
              "tools_logo"=> $toolsLogo['js'],
              "tools_name"=> $toolsName['js'],
            ),
            array(
              "tools_logo"=> $toolsLogo['php'],
              "tools_name"=> $toolsName['php'],
            ),
          )
        ),
        array(
          "url"=> "https://www.figma.com/file/bhc305pmrOggsoq1u3pr5J/Peduli-Lansia?node-id=202%3A536",
          "class"=> "item hide",
          "type"=> $type['app_design'],
          "name"=> "Laskar (Lansia Sejahtera Berkarya)",
          "image"=> "assets/img-laskar.png",
          "tools" => array(
            array(
              "tools_logo"=> $toolsLogo['figma'],
              "tools_name"=> $toolsName['figma'],
            )
          )
        ),
        array(
          "url"=> "https://www.figma.com/file/FfKjJ77dSOtwyWEJfV7Zi2/GROWUP?node-id=0%3A1",
          "class"=> "item hide",
          "type"=> $type['logo_design'],
          "name"=> "10+ Company Logo",
          "image"=> "assets/img-logo.png",
          "tools" => array(
            array(
              "tools_logo"=> $toolsLogo['figma'],
              "tools_name"=> $toolsName['figma'],
            ),
          )
        ),
        array(
          "url"=> "https://github.com/Pangeranmw/2048-Championship",
          "class"=> "item hide",
          "type"=> $type['desktop_game'],
          "name"=> "2048 Championship",
          "image"=> "assets/img-2048.png",
          "tools" => array(
            array(
              "tools_logo"=> $toolsLogo['java'],
              "tools_name"=> $toolsName['java'],
            ),
          )
        ),
        array(
          "url"=> "https://www.figma.com/file/uQN2kPnHRxfLtoePOBXvhA/BARING-SISTEM?node-id=0%3A1",
          "class"=> "item hide",
          "type"=> $type['web_design'],
          "name"=> "BARING (Banjir Monitoring)",
          "image"=> "assets/img-baring.png",
          "tools" => array(
            array(
              "tools_logo"=> $toolsLogo['figma'],
              "tools_name"=> $toolsName['figma'],
            ),
          )
        ),
        array(
          "url"=> "https://github.com/Pangeranmw/GithubUser-Submission-1",
          "class"=> "item hide",
          "type"=> $type['android_app'],
          "name"=> "Github User",
          "image"=> "assets/img-github.png",
          "tools" => array(
            array(
              "tools_logo"=> $toolsLogo['kotlin'],
              "tools_name"=> $toolsName['kotlin'],
            ),
          )
        ),
        array(
          "url"=> "https://www.figma.com/file/aQIXmM1BZw8WQHTAZnW2NC/CHOPPER-SISTEM?node-id=0%3A1",
          "class"=> "item hide",
          "type"=> $type['android_app'],
          "name"=> "CHOPPER (Cure Health Operation)",
          "image"=> "assets/img-chopper.png",
          "tools" => array(
            array(
              "tools_logo"=> $toolsLogo['figma'],
              "tools_name"=> $toolsName['figma'],
            ),
          )
        ),
      );
    }
    function getData(){
      return $this->arrayData;
    }
  }
?>
