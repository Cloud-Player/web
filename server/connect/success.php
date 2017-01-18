<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cloud Player-Sucessfully connected</title>
</head>
<body>
The connection to Soundcloud was successful.
<script>
  var response = {
    access_token: "<?php echo $_GET['access_token'] ?>",
    expires_on: <?php echo $_GET['expires_on'] ?>,
    refresh_token: "<?php echo $_GET['refresh_token'] ?>"
  };

  function receiveMessage(event)
  {
    event.source.postMessage(response, event.origin);
    window.close();
  }
  window.addEventListener("message", receiveMessage, false);
</script>
</body>
</html>

