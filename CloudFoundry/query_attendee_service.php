<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=Cp1252">
<title>Insert title here</title>
</head>
<frameset>
    <frame>
    <frame>
    <noframes>
    <body>
    <p>Querying CloudFoundry apps</p>
    <?php
    $url = "http://attendee-service.cfapps.io/";
    $json = file_get_contents($url);
    $json_data = json_decode($json, true);
   	print "My token: ". $json_data["_links"]["profile"]["href"];
    #$output = shell_exec('sample.sh');
    #echo "<br>".$output."</br>";
	?>
    </body>
    </noframes>
</frameset>
</html>
