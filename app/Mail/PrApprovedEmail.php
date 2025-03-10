<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Support\Facades\Log;

class PrApprovedEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(private $requestor, private $pr_header , private array $pr_attachments = [])
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "ProcMgmt - PR {$this->pr_header->pr_number} is {$this->pr_header->status}"
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.pr.approve-email',
            with: ['requestor' => $this->requestor,  'pr_header' => $this->pr_header],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */

    public function attachments(): array
    {
        if (empty($this->pr_attachments)) {
            Log::info("No attachments found for PR: {$this->pr_header->pr_number}");
            return []; 
        }

        return collect($this->pr_attachments)->map(function ($filepath, $filename) {
            $fullPath = public_path($filepath);

            if (!$fullPath || !file_exists($fullPath)) {
                Log::error("Attachment not found: {$fullPath}");
                return null; 
            }

            return Attachment::fromPath($fullPath)->as($filename);
        })->filter()->all(); 
    }


}
