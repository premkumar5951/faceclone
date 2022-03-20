import React from "react";
import "./sidebar.css";
import {
  RssFeed,
  Chat,
  VideoLibrary,
  PeopleAlt,
  Bookmark,
  LiveHelp,
  Work,
  Event,
  LocalLibrary,
} from "@mui/icons-material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Button from "@mui/material/Button";

export default function sidebar() {
  return (
    <div className='sidebar'>
      <div className='feedlist mt-2'>
        <ul className='list'>
          <li className='items'>
            <RssFeed className='icons' />
            Feeds
          </li>
          <li className='items'>
            <Chat className='icons' />
            Chats
          </li>
          <li className='items'>
            <VideoLibrary className='icons' />
            Videos
          </li>
          <li className='items'>
            <PeopleAlt className='icons' />
            Groups
          </li>
          <li className='items'>
            <Bookmark className='icons' />
            Bookmarks
          </li>
          <li className='items'>
            <LiveHelp className='icons' />
            Questions
          </li>
          <li className='items'>
            <Work className='icons' />
            Jobs
          </li>
          <li className='items'>
            <Event className='icons' />
            Events
          </li>
          <li className='items'>
            <LocalLibrary className='icons' />
            Courses
          </li>
        </ul>
      </div>
      <div className='text-center fw-bold'>
        <Button color='secondary' className='buttn'>
          Show More
        </Button>
      </div>
      <hr />
      <div className='fdiv'>
        <ul className='flists'>
        <li className="online">
        <h5 className="fw-600" >Online</h5><FiberManualRecordIcon className="onlineicon"/>
        </li>
          <li className='fitems'>
            <img src='/assets/person/p2.jpg' alt='' />
            Prem Kumar
          </li>
          <li className='fitems'>
            <img src='/assets/person/p3.jpg' alt='' />
            Prem Kumar
          </li>
          <li className='fitems'>
            <img src='/assets/person/p4.jpg' alt='' />
            Prem Kumar
          </li>
          <li className='fitems'>
            <img src='/assets/person/p5.jpg' alt='' />
            Prem Kumar
          </li>
          <li className='fitems'>
            <img src='/assets/person/p6.jpg' alt='' />
            Prem Kumar 
          </li>
          <li className='fitems'>
            <img src='/assets/person/p7.jpg' alt='' />
            Prem Kumar
          </li>
          <li className='fitems'>
            <img src='/assets/person/p8.jpg' alt='' />
            Prem Kumar
          </li>
          <li className='fitems'>
            <img src='/assets/person/p9.jpg' alt='' />
            Prem Kumar
          </li>
          <li className='fitems'>
            <img src='/assets/person/p10.jpg' alt='' />
            Prem Kumar
          </li>
        </ul>
      </div>
      
    </div>
    
    
  );
}
