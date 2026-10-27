<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://buttonplumbingoregon.com');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Honeypot check
if (!empty($input['_honey'])) {
    echo json_encode(['success' => true]);
    exit;
}

$name    = strip_tags($input['name'] ?? '');
$phone   = strip_tags($input['phone'] ?? '');
$email   = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
$service = strip_tags($input['service'] ?? '');
$address = strip_tags($input['address'] ?? '');
$message = strip_tags($input['message'] ?? '');
$source  = strip_tags($input['_source'] ?? 'Website');

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and phone are required']);
    exit;
}

date_default_timezone_set('America/Los_Angeles');
$timestamp = date('l, F j, Y \a\t g:i A T');

// TODO: Replace with actual Resend API key after domain verification
$resendKey = 're_XXXXXXXXXX';
$toEmail   = 'info@buttonplumbingoregon.com'; // TODO: confirm email
$ccEmail   = ''; // TODO: owner personal email for CC
$fromEmail = 'Button Plumbing <noreply@buttonplumbingoregon.com>';

$replyTo = !empty($email) ? $email : '';

$htmlBody = '
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;border:1px solid #D0DCE5;border-radius:8px;overflow:hidden;">
<tr>
<td style="background:#1A3347;padding:28px 32px;text-align:center;">
  <div style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">BUTTON PLUMBING</div>
  <div style="color:#C17831;font-size:15px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-top:4px;">SERVICE REQUEST</div>
  <div style="color:#C17831;font-size:13px;border-top:1px solid rgba(193,120,49,0.3);padding-top:12px;margin-top:12px;">New ' . htmlspecialchars($source) . ' Enquiry</div>
</td>
</tr>
<tr>
<td style="padding:28px 32px;">
  <div style="margin-bottom:20px;">
    <a href="mailto:' . htmlspecialchars($email ?: '') . '" style="display:inline-block;background:#C17831;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px;margin-right:8px;">Reply to ' . htmlspecialchars($name) . '</a>
    <a href="tel:' . htmlspecialchars($phone) . '" style="display:inline-block;background:#1A3347;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px;">Call ' . htmlspecialchars($phone) . '</a>
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;">
    <tr style="background:#F5F8FA;"><td style="padding:10px 14px;font-weight:700;width:120px;color:#4A5C66;">Name</td><td style="padding:10px 14px;">' . htmlspecialchars($name) . '</td></tr>
    <tr><td style="padding:10px 14px;font-weight:700;color:#4A5C66;">Phone</td><td style="padding:10px 14px;"><a href="tel:' . htmlspecialchars($phone) . '" style="color:#1A3347;">' . htmlspecialchars($phone) . '</a></td></tr>
    <tr style="background:#F5F8FA;"><td style="padding:10px 14px;font-weight:700;color:#4A5C66;">Email</td><td style="padding:10px 14px;">' . ($email ? '<a href="mailto:' . htmlspecialchars($email) . '" style="color:#1A3347;">' . htmlspecialchars($email) . '</a>' : 'Not provided') . '</td></tr>
    <tr><td style="padding:10px 14px;font-weight:700;color:#4A5C66;">Service</td><td style="padding:10px 14px;">' . htmlspecialchars($service ?: 'Not specified') . '</td></tr>
    <tr style="background:#F5F8FA;"><td style="padding:10px 14px;font-weight:700;color:#4A5C66;">Address</td><td style="padding:10px 14px;">' . htmlspecialchars($address ?: 'Not provided') . '</td></tr>
    <tr><td style="padding:10px 14px;font-weight:700;color:#4A5C66;">Details</td><td style="padding:10px 14px;">' . nl2br(htmlspecialchars($message ?: 'No details provided')) . '</td></tr>
    <tr style="background:#F5F8FA;"><td style="padding:10px 14px;font-weight:700;color:#4A5C66;">Source</td><td style="padding:10px 14px;">' . htmlspecialchars($source) . '</td></tr>
  </table>
</td>
</tr>
<tr>
<td style="background:#F5F8FA;padding:16px 32px;text-align:center;font-size:12px;color:#7A8D96;border-top:1px solid #D0DCE5;">
  Submitted ' . $timestamp . '<br>
  Button Plumbing LLC &middot; Siletz, OR 97380 &middot; (541) 444-2290
</td>
</tr>
</table>';

$payload = [
    'from'    => $fromEmail,
    'to'      => [$toEmail],
    'subject' => 'New Service Request from ' . $name . ' (' . $source . ')',
    'html'    => $htmlBody,
];

if ($replyTo) {
    $payload['reply_to'] = $replyTo;
}

if ($ccEmail) {
    $payload['cc'] = [$ccEmail];
}

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $resendKey,
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send', 'detail' => $response]);
}
