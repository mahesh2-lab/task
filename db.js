const supabase = window.supabase.createClient(
  "https://tvlcpldeiyvojryaxegn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bGNwbGRlaXl2b2pyeWF4ZWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MDYzOTQsImV4cCI6MjA2NzE4MjM5NH0.kjVovSEuBrVpmWC4QKc6f5MIr1LhwEI3KlD7mCRiQ20"
);

document
  .getElementById("taxForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {};
    for (const [key, value] of formData.entries()) {
      const input = e.target.elements[key];
      if (!input) {
        data[key] = value;
        continue;
      }
      if (input.type === "number") {
        data[key] = value === "" ? null : Number(value);
      } else if (input.type === "checkbox") {
        data[key] = input.checked;
      } else if (input.type === "radio") {
        if (input.checked) data[key] = value;
      } else {
        data[key] = value;
      }
    }

    data.has_toilet = data.has_toilet === "true";

    // const { error } = await supabase
    //     .from('gram')
    //     .insert([data]);

    let error;
    if (error) {
      console.error("Error inserting data:", error);
      alert("Error submitting form. Please try again.");
      return;
    }

    alert("Form submitted successfully!");

    submitForm();
    e.target.reset();
  });
