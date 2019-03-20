package com.MTOPlayer.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SongController {
    private String pageName;

    @RequestMapping(value = "/song/{songId}", method = RequestMethod.GET)
    public String showSong(@PathVariable int songId, Model model){
        pageName = "Song";
        model.addAttribute("pageName", pageName);
        return "player";
    }
}