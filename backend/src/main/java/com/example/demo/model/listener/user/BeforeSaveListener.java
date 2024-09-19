package com.example.demo.model.listener.user;

import com.example.demo.model.User;
import com.example.demo.util.SecurityUtil;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeSaveEvent;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class BeforeSaveListener extends AbstractMongoEventListener<User> {

    @Override
    public void onBeforeSave(BeforeSaveEvent<User> event) {
        User user = event.getSource();
        if (user.getCreatedAt() == null) {
            user.setCreatedAt(Instant.now());
        } else {
            user.setUpdatedAt(Instant.now());
        }

    }
}
