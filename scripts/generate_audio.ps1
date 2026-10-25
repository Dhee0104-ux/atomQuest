Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.Rate = 0
$outputFile = Join-Path $PSScriptRoot "..\AquaMind_Narration.wav"
$synth.SetOutputToWaveFile($outputFile)

$lines = @(
    "Water purifiers should not run on blind timers. AquaMind combines transparent condition-aware prognostics with neighborhood telemetry to make filter maintenance predictable and self-verifiable.",
    "When a municipal pipe repair stirs sediment in Ward 4, purifiers detect elevated differential pressure and rising inlet TDS. Rather than blaming the consumer, AquaMind alerts on real upstream stress.",
    "On our vector map, 14 reporting purifiers in Ward 4 cluster an identical turbidity spike. With privacy-preserving k-anonymity, households see the root cause without sharing private telemetry.",
    "Unlike opaque AI black boxes, our prognostic formula is open: Remaining life equals rated capacity minus usage, multiplied by an audited water quality condition factor.",
    "A user replaces their RO cartridge at home. AquaMind monitors flush volume and differential pressure. An incomplete flush is held pending; an O-ring defect is flagged immediately.",
    "With 6 liters flushed and 93 percent salt rejection restored, the maintenance record is verified in simulation and the alert clears. AquaMind turns connected water into trusted intelligence."
)

foreach ($line in $lines) {
    $synth.Speak($line)
    Start-Sleep -Milliseconds 600
}

$synth.Dispose()
Write-Host "Audio generation finished: $outputFile"
