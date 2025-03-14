<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PoApprovedEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(private $requestor, private $po_header, private array $po_attachments = [])
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "ProcMgmt - PO {$this->po_header->po_number} is {$this->po_header->status}",
            // cc: $this->approver_email
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.po.approve-email',
            with: ['requestor' => $this->requestor,  'po_header' => $this->po_header],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        if (empty($this->po_attachments)) {
            Log::info("No attachments found for PO: {$this->po_header->po_number}");

            return [];
        }

        return collect($this->po_attachments)->map(function ($filepath, $filename) {
            $fullPath = public_path($filepath);

            if (! $fullPath || ! file_exists($fullPath)) {
                Log::error("Attachment not found: {$fullPath}");

                return null;
            }

            return Attachment::fromPath($fullPath)->as($filename);
        })->filter()->all();
    }
}
