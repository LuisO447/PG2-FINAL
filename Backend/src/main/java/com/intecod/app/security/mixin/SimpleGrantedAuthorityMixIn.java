package com.intecod.app.security.mixin;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class SimpleGrantedAuthorityMixIn {

    @JsonCreator
    public SimpleGrantedAuthorityMixIn(@JsonProperty("authority") String role) {
    }
}
