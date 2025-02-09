rs.initiate({
  _id: "stockSet",
  members: [
    { _id: 0, host: "10.0.0.28:27017" },
    { _id: 1, host: "10.0.0.29:27017" },
    { _id: 2, host: "10.0.0.30:27017" }
  ]
}) 