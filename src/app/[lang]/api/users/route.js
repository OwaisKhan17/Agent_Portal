// app/api/users/route.js
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 5;
    const skip = (page - 1) * limit;
    console.log('limit ',limit)
    console.log('skip ',skip)
    console.log('url ',`https://dummyjson.com/users?limit=${limit}&skip=${skip}&select=firstName,age`)
  
    try {
      const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}&select=firstName,age,email,role`);
      const data = await response.json();
      console.log('data ',data.users)
      return new Response(JSON.stringify({ data: data.users, total: data.total }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Error fetching data' }), {
        status: 500,
      });
    }
  }
  