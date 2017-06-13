<?php 

	$data = json_decode(file_get_contents('php://input'));

	$first_name = $data->firstName;
	$last_name = $data->lastName;
	$email = $data->email;
	$message = $data->message;

	$fullMessage = "Name: " . $firstName . " " . $lastName . "\n" .
						"Email: " . $email . "\n";

	if(property_exists($data,'phone_number')) {
		$phone_number = $data->phone_number;

		$fullMessage = $fullMessage . " " . "Phone: " . $phone_number . "\n\n";
	}

	$fullMessage = $fullMessage . $message;

	$subject = 'Website Message from ' . $firstName . ' ' . $lastName;

	$headers = 'From: ' . $email .
			"\nReply-To: " . $email .
			"\nX-Mailer: PHP/" . phpversion();
		
	mail('mrsmaft@gmail.com', "$subject", $fullMessage, $headers);
?>