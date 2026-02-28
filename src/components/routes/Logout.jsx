import { authApi, useLogoutUserMutation } from '@/services/auth'
import React from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Loader2, LogOut } from "lucide-react"

const LogoutButton = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap()
      dispatch(authApi.util.resetApiState())
      navigate("/login", { replace: true })
      console.log("Logged out successfully")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Button
        variant="outline"
        size="lg"
        className="flex items-center space-x-2 transition-all duration-200 hover:scale-105"
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
        <LogOut className="h-5 w-5" />
        <span>{isLoading ? "Logging out..." : "Logout"}</span>
      </Button>
    </div>
  )
}

export default LogoutButton