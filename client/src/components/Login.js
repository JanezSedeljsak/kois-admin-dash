import React, { useState } from 'react';

export default function Login() {
  const [count, setCount] = useState(0);

  return (
    <div>
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1" class="bmd-label-floating">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1"/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1" class="bmd-label-floating">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"/>
            </div>
        </form>
    </div>
  );
}