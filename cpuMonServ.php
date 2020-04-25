<?php

//exit();
if($_GET['mode'] == "cpu"){
  echo shell_exec("top -bn1 | sed -n '/Cpu/p' | awk '{print $2}' | sed 's/..,//'");
}

if($_GET['mode'] == "top"){
  echo shell_exec("top -bn1|head -n 11|tail -n 5|awk '{ print $9\" \"$12 }'");
}

if($_GET['mode'] =="disk"){
  echo shell_exec("df /|awk {' print $5 '}|tail -n 1");
}

if($_GET['mode'] == "ssid"){
  echo shell_exec("iwgetid -r");
}

if($_GET['mode'] == "ip"){
  echo shell_exec("hostname -I|cut -d ' ' -f 1");

}

if($_GET['mode'] == "iwconfig"){
  echo shell_exec("iwconfig");

}

if($_GET['mode'] == "warnings"){
  echo shell_exec("journalctl --since today -p 4|grep -v \"\-\-\" |wc -l");
}
if($_GET['mode'] == "errors"){
  echo shell_exec("journalctl --since today -p 3|grep -v \"\-\-\"|wc -l");
}

if($_GET['mode'] == "status"){
  echo 'Online';
}



?>
