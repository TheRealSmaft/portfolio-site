<?php 

	$data = json_decode(file_get_contents('php://input'));

	$firstName = $data->firstName;
	$lastName = $data->lastName;
	$email = $data->email;
	$message = $data->message;

	$fullMessage = "Name: " . $firstName . " " . $lastName . "\n" .
						"Email: " . $email . "\n";

	if(property_exists($data,'phoneNumber')) {
		$phone = $data->phone;

		$fullMessage = $fullMessage . " " . "Phone: " . $phone . "\n\n";
	}

	$fullMessage = $fullMessage . $message;

	$subject = 'Website Message from ' . $firstName . ' ' . $lastName;

	$headers = 'From: ' . $email .
			"\nReply-To: " . $email .
			"\nX-Mailer: PHP/" . phpversion();
		
	mail('mrsmaft@gmail.com', $subject, $fullMessage, $headers);
?>