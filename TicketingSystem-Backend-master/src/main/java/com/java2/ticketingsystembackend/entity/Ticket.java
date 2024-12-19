package com.java2.ticketingsystembackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "info_id")
    private TicketInfo info;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}

