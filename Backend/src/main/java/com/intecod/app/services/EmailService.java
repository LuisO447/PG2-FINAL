package com.intecod.app.services;

import com.intecod.app.dto.EmailRequest;

public interface EmailService {
    void sendEmail(EmailRequest request);
}
