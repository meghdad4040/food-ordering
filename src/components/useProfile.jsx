"use client"

import { useEffect, useState } from "react";

export const useProfile = () => {
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    fetch("/api/profile").then(Response => {
      Response.json().then(data => {
        setData(data)
        setLoading(false)
      })
    })
  }, []);

  return { loading, data }
}

