test('createUser returns a new user object (valid input)', async() => {
    let res = await fetch(`http://localhost:4000/api/users/signup`,
    {
        method:"POST",
        credentials:'include',
        body:JSON.stringify({
            username:"unitTestUser",
            password:"1234",
            displayName:"Unit Test"
        }),
        headers: {"Content-Type": "application/json"}
    }
    );
    let res1 = await res.json();
    //these two keys are non-deterministic, so we can't test them
    delete res1._id;
    delete res1.password;
    expect(res1).toEqual({
        username:"unittestuser",
        // password:"$2a$12$dhoMLcKF51vXMFqCrqILqetMxjlCxYg.vZndO7ND9nbyFpCHY4EBe",
        displayName:"Unit Test",
        description:"Default description here.",
        isMentor:false,
        skills:{},
        hostedEvents:[],
        attendedEvents:[]
    })
  })

test('createUser returns a new user object (invalid input)', async() => {
    let res = await fetch(`http://localhost:4000/api/users/signup`,
    {
        method:"POST",
        credentials:'include',
        body:JSON.stringify({
            username:"no",
            password:"1",
            displayName:"bad input"
        }),
        headers: {"Content-Type": "application/json"}
    }
    );
    let res1 = await res.json();
    //these two keys are non-deterministic, so we can't test them
    delete res1._id;
    delete res1.password;
    expect(res1).toEqual({"error":"Username must be at least 3 characters long"})
  })

test('Deleting a user', async() => {
    let loginRes = await fetch(`http://localhost:4000/api/users/login`,
    {
        method:"POST",
        credentials:'include',
        body:JSON.stringify({
            username:"unitTestUser",
            password:"1234",
            displayName:"Unit Test"
        }),
        headers: {"Content-Type": "application/json"}
    }
    );
    loginRes = await loginRes.json()
    let deleteRes = await fetch(`http://localhost:4000/api/users/profile`,
        {
            method:"DELETE",
            credentials:"include",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({id:loginRes.user.userId})
        }
    )
    deleteRes = await deleteRes.json()
    expect(deleteRes).toEqual({"acknowledged":true,"deletedCount":1})
})



