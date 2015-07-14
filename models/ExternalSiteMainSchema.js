var mongoose = require('mongoose');

var externalSchema = new mongoose.Schema({
    
  Ticker : [String], 
  Project_Name : String,
  Project_Manager : String,
  Show_Flag_Main : Boolean,       

  welcomePageSchema :  {
    Show_Flag :Boolean,           //true if the page is to be displayed ,else false
    Banner :String,               //path of the banner image for welcome page
    We_Are_Here : {
      Tab_name : String,          //Title of the section --'We are here now'
      Show_Flag: Boolean,         //true if this section is to be displayed
      as_of_date: String,         
      Phases : [{
        Stage : String,           //specify the phase name
        Phase_detail : [{ 
          Description : [String],   // specify the stage name

          Class : String,           //'circle done' if status of stage is complete 
                                    //'circle partial' if in process,
                                    //'circle not done' if not started

          Bannner_Class : String,   //'bar' if bars are to be displayed   
          Marker_Class : String    //'marker' if this stage is the current stage 
        }]
      }]
    },
    Key_Dates_Watch : [{
      Tab_name : String,      //'Key dates to watch out for'
      Show_Flag: Boolean,     //true if this section is to be displayed
      Phases : [{
        Phase : [{ 
          Phase_No : String, 
          Class : String,     //'phase-td'
          Content_Data  : [{  //contains the phase description
            Milestone : String,
            Target_Date : Date,
            Status : String,
            Comments : String,
            Show_Flag_Welcome : Boolean //true if this record is to be shown on welcome page
          }]
          
        }]
      }]
    }],

    Keys_Success_Left :{ 

      as_of_date : String,
      Show_Flag: Boolean,//true if this section is to be displayed

//fields starting from Stakeholders to Overall_Status :'GreenCol'for stable status ,'YellowCol' for amber or 'redCol'      
      Stakeholders : String,
      Business_Benefits : String, 
      Work_Schedule : String,
      Team :String,
      Scope_Managed :String,
      Risks :String,
      Organization_Benefits :String,
      Overall_Status : String
 
    },

    Keys_Success_Right: {
      Show_Flag: Boolean,

//for Stakeholders to Overall_Status -> 
//    Comments : Reasons/Comments if the Colour_Forecast is either Red or Amber 
//    Colour_Forecast : 'GreenCol'for stable status ,'YellowCol' for amber or 'redCol'      
      Stakeholders : { 
        Comments : String ,                   
        Colour_Forecast : String                
      },
      Business_Benefits : {
        Comments : String ,
        Colour_Forecast : String
      },
      Work_Schedule : { 
        Comments : String , 
        Colour_Forecast : String
      },
      Team :{ 
        Comments : String , 
        Colour_Forecast : String
      },
      Scope_Managed :{ 
        Comments : String , 
        Colour_Forecast : String
      },
      Risks :{ 
        Comments : String , 
        Colour_Forecast : String
      },
      Organization_Benefits :{ 
        Comments : String , 
        Colour_Forecast : String
      }

    },
      
  Operational_Stability : [{
    Tab_name :String,
    Show_Flag: Boolean,  //If false then caption should be entered , if true fields starting from as_of_date should be entered
    Caption :String,     //Enter a caption -- 'Coming soon'

    As_of_date_op_stability : String,

    Total_down_time_month : {       //structure for Total down time month section
      Total_down_time_month_fig : String,     //Figure indicating the percentage completion 
      Total_down_time_month_fig_class:String, //css class name
      Total_down_time_month_note : [String],  //description
      Total_down_time_month_flag :Boolean     // true/false to show/hide the section
    },

    Total_down_time_Q :{            //structure for Total down time Q section
      Total_down_time_Q_fig : String,
      Total_down_time_Q_fig_class :String,    //css class name
      Total_down_time_Q_note : [String],      //description
      Total_down_time_Q_flag :Boolean         // true/false to show/hide the section
    },

    Avg_MTTR1 : {                   //structure for Avg MTTR1 section
      Avg_MTTR_fig1 : String,
      Avg_MTTR_note1 :[String],
      Avg_MTTR_fig1_class :String,
      Avg_MTTR_flag1 :Boolean
    },

    Avg_MTTR2:{                     // structure for Abf
      Avg_MTTR_fig2 : String,
      Avg_MTTR_fig2_class:String,
      Avg_MTTR_note2 : [String],
      Avg_MTTR_flag2 :Boolean
    },
    
    Red_High_Priority_Incid:{       //Reduction of high  priority incidents section
      Red_High_Priority_Incid_fig : String,
      Red_High_Priority_Incid_fig_class :String,
      Red_High_Priority_Incid_note : [String],
      Red_High_Priority_Incid_flag :Boolean
    },

    Red_High_Priority_Incid_3and4:{ //Reduction of priority 3 & 4 incidents section
      Red_High_Priority_Incid_3and4_fig : String,
      Red_High_Priority_Incid_3and4_fig_class :String,
      Red_High_Priority_Incid_3and4_note : [String],
      Red_High_Priority_Incid_3and4_flag:Boolean
    }
    
  }],

    Upcoming_Events : [{
      Show_Flag: Boolean,  //true or false
      Event : String,     //Event name
      date : String,      //Date at which event will be held
      Event_Desc : [String] // Event description
    }],
  },

aboutPageSchema : {

  Show_Flag : Boolean, 
  Banner : String,      
  Page_Description : {
    Show_Flag: Boolean, //true if this section is to be displayed
    Heading : String, // Heading of the about page
    Content : [String] //content for the page description
  },
  Approach_Tab_Name : String, //Title of the section : 'What is the approach and timeline?'
  Approach_Timeline :String, //path of the image 

  Methodology_Tab_Name: String, //Title of the section
  Methodology : String,         //path of the image for this section

  Scope_Tab_Name : String, //Title of the section
  Scope_Image : String,   //image path

  Core_Team : [{
    Show_Flag :Boolean, //true / false
    Photo :String,      //path of the image of core team member
    Title : String,     //Name of the core team member
    Designation :String, //Designation of the core team member
    Description :String //for fun facts , if available
  }]
},

dashboardPageSchema : {

  Show_Flag: Boolean, //true if dashboard page is to be displayed
  Banner :String,     // dashboard banner image path

//for fields from Quality_Metrics to Servce---
//   Show_Flag field : true if the section is to be displayed otherwise false
//   Image1 ,Image2,Image3 Image 4 : enter the path of the image
//   Image_flag - > true if the image is to be shown or false to hide it 

  Quality_Metrics :{
    Tab_name : String, // 'Quality metrics'
    Show_Flag: Boolean,

    Image1 :String,
    Image1_Flag : Boolean, 
    Image2 :String,
    Image2_Flag :Boolean,
    Image3 : String,
    Image3_Flag :Boolean,
    Image4 :String,
    Image4_Flag : Boolean
  },
  Agile_Metrics :{
    Tab_name :String, //'Agile metrics'
    Show_Flag: Boolean,
    Image1 :String,
    Image1_Flag : Boolean,
    Image2 :String,
    Image2_Flag :Boolean,
    Image3 : String,
    Image3_Flag :Boolean,
    Image4 :String,
    Image4_Flag : Boolean
  },
  Operations:{
    Tab_name :String,       
    Show_Flag: Boolean,    
    Image1 :String,
    Image1_Flag : Boolean, 
    Image2 :String,
    Image2_Flag :Boolean,
    Image3 : String,
    Image3_Flag :Boolean,
    Image4 :String,
    Image4_Flag : Boolean
  },
  Service :{
    Tab_name :String,
    Show_Flag: Boolean,
    Image1 :String,
    Image1_Flag : Boolean,
    Image2 :String,
    Image2_Flag :Boolean,
    Image3 : String,
    Image3_Flag :Boolean,
    Image4 :String,
    Image4_Flag : Boolean
  }
},

reportPageSchema : {
  Show_Flag: Boolean,     //true if reports page is to be displayed
  Banner : String,          //path of the banner image for reports page
  Page_Description : String,
  Download_url : String,    //'https://file-download.mybluemix.net' 
  Page_name : String,       //'reports'
  Project_folder : String,  //specify the project name
  
  Tabs : [{
  
      Tab_name :String,
      Show_Flag :Boolean,  //if true then tab_name,date,fie_name should be entered.If false caption should be entered      
      Caption :String,    //if reports are not present
      Content:[{
        date : Date,
        File_name : String //name of the file which is to be downloaded
      }]
     //url will be combination of download_url+page_name+project_folder+file_name

  }]
},

knowledgeBasePageSchema : {
  Show_Flag: Boolean,       //true if knowledge base page is to be displayed
  Banner : String,          //path of the banner image for the page
  Page_Description : String, 
  Download_link : String,   //'https://file-download.mybluemix.net'
  Page_name : String,      //'knowledgeBase'
  Project_folder : String, // specify the project name
  
  Tabs : [{
    Tab_name : String,  
    Show_Flag: Boolean,//if true then tab_name,date,fie_name should be entered.If false caption should be entered
    Caption : String,//if reports are not present
    Tab_details : [String],  
    Topics_covered : [{ 
      Main_Content:String,
      Sub_level_1:[{
        Sub_level_1_Content:String,
        Sub_level_2:[String]
      }]
    }], 
    File_name : String
  }]
//url will be combination of download_url+page_name+project_folder+file_name

},

gatewayPageSchema : [{
  Link_name: String, //link name on the drop-down list
  Link_url : String   //url for the link
}],

ticketToolPageSchema : [{
  Link_name :String, 
  Link_url : String
}]

});

module.exports = mongoose.model('ExternalModel',externalSchema);//exporting the model to make it available in other files