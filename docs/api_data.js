define({ "api": [
  {
    "name": "Auth",
    "group": "Authorization",
    "version": "1.0.0",
    "description": "<p>Authorizes user by his <code>name</code> and <code>password</code> and returns <code>token</code> to access other api functions.</p>",
    "type": "post",
    "url": "/auth/",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "token",
            "description": "<p>Contains jwt token if authorization succes</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "succes",
            "description": "<p>Status of response. <code>true</code> -&gt; ok. <code>false</code> -&gt; see <code>message</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "message",
            "description": "<p>Message describing status of response.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"token\": \"JWT long token here_asxassdv,d;fmdfmgdflfmdlmgdlfmgldfmgldmfgldfgdlfm\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/v1/index.js",
    "groupTitle": "Authorization",
    "sampleRequest": [
      {
        "url": "https://nodejs-rest-api-app-alikhil.c9users.io/api/v1/auth/"
      }
    ]
  },
  {
    "name": "SignUp",
    "group": "Authorization",
    "version": "1.0.0",
    "description": "<p>Creates user with <code>name</code> and <code>password</code>.</p>",
    "type": "post",
    "url": "/signup/",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"message\": \"Successful created new user.\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "message",
            "description": "<p>Message describing status of response.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "succes",
            "description": "<p>Status of response. <code>true</code> -&gt; ok. <code>false</code> -&gt; see <code>message</code></p>"
          }
        ]
      }
    },
    "filename": "routes/api/v1/index.js",
    "groupTitle": "Authorization",
    "sampleRequest": [
      {
        "url": "https://nodejs-rest-api-app-alikhil.c9users.io/api/v1/signup/"
      }
    ]
  },
  {
    "name": "Users",
    "group": "Users",
    "type": "get",
    "url": "/users/",
    "title": "",
    "description": "<p>Getting list of <code>User</code>s</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT token that given by <code>/auth</code> method</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of users of type <code>User</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "succes",
            "description": "<p>Status of response. <code>true</code> -&gt; ok. <code>false</code> -&gt; see <code>message</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "message",
            "description": "<p>Message describing status of response.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"users\": [ {\"name\": \"alik\", \"age\": 19 } ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/v1/index.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "https://nodejs-rest-api-app-alikhil.c9users.io/api/v1/users/"
      }
    ]
  },
  {
    "name": "users",
    "group": "Users",
    "version": "2.0.0",
    "description": "<p>Getting list of users.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT token that given by <code>/auth</code> method</p>"
          }
        ]
      }
    },
    "type": "get",
    "url": "/users/",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of real users this service.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "succes",
            "description": "<p>Status of response. <code>true</code> -&gt; ok. <code>false</code> -&gt; see <code>message</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "message",
            "description": "<p>Message describing status of response.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://nodejs-rest-api-app-alikhil.c9users.io/api/v2/users/"
      }
    ],
    "filename": "routes/api/v2/index.js",
    "groupTitle": "Users"
  }
] });
