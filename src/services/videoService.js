import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = 'https://whslhhnsbdgiwkoyadaq.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoc2xoaG5zYmRnaXdrb3lhZGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODYzNzksImV4cCI6MTk4Mzk2MjM3OX0.-9Kaeu8_iFrU_aiOXRFn51jPaUvCfSfFVEP_-TP3Ny4'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from('video')
                    .select('*')
        }
    }
}