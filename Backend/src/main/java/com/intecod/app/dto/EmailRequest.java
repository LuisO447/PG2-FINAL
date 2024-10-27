package com.intecod.app.dto;

import lombok.Data;

@Data
public class EmailRequest {
    private String to;
    private String cc;
    private String bcc;
    private String subject;
    private String text;
}