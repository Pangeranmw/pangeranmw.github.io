<?php
  include 'data.php';
  $project = new Portfolio();
  $project->setData();
  $projects = $project->getData();
  foreach($projects as $project){
    print($project['url']);
    print($project['name']);
    foreach ($project['tools'] as $tools) {
      print($tools['tools_name']);
      print($tools['tools_logo']);
    }
  }  
?>
