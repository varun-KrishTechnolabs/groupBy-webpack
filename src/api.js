// import dotenv from "dotenv";
// dotenv.config();
/**
 * This is the instance of class to make an api call
 * Here creating an instance was a better option because we need to use the headers everywhere
 */
class fetchClass {
  constructor() {
    this.defaultHeaders = new Headers();
    this.defaultHeaders.append(
      "Authorization",
      "client-key 7917ec75-cb89-4330-8830-6331220d707b"
    );
    this.defaultHeaders.append("Content-Type", "application/json");
    this.defaultHeaders.append("X-Groupby-Customer-ID", "spiral");
  }

  async post({ url, headers = {}, data }) {
    const response = await fetch(url, {
      method: "POST",
      headers: this.defaultHeaders,
      body: JSON.stringify(data),
    });

    return await response.json();
  }
}

// Here this class is initiated and along with that we can access its methods for making the api call
export const fetchInstance = new fetchClass();
