import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    showInfo();
  }, []);

  async function showInfo() {
    const cookie = document.cookie;
    var fields = cookie.split(';');
    var token = null;
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i].split('=');
      if (f[0].trim() === '_auth') {
        token = f[1];
        break;
      }
    }

    if (token) {
      const response = await fetch(`http://localhost:3001/users/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      });
      const data = await response.json();
      if (data.name) {
        document.getElementById('userInfo').innerHTML = `Ola, ${data.name}!`;
      }
    }
  }
  return (
    <div className="flex h-full w-full justify-center">
      <h1
        className=" m-auto text-4xl font-bold text-center text-gray-700 "
        id="userInfo"
      >
        Ola, usuario!
        {/* User info will be displayed here */}
      </h1>
    </div>
  );
}
