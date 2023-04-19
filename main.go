package main

import (
  _ "embed"
  "github.com/wailsapp/wails"
  "github.com/shirou/gopsutil/cpu"
  "github.com/shirou/gopsutil/mem"
  "syscall"
  
)



//go:embed frontend/build/main.js
var js string
var x float64

//var assets embed.FS

//go:embed frontend/build/main.css
var css string

func main() {

  app := wails.CreateApp(&wails.AppConfig{
    Width:  1024,
    Height: 700,
    Title:  "practica1",
    JS:     js,
    CSS:    css,
    Colour: "#131313",
  })
  app.Bind(getCPUPercentage)
  app.Bind(getDiskUsage1)
  app.Bind(getDiskFree)
  app.Bind(getDiskTotal)
  app.Bind(getRamPercentage)
  app.Bind(getRamUsed)
  app.Bind(getRamTotal)
  app.Bind(getRamFree)
  
  app.Run()
}

func getDiskUsage1() (used float64) {
  var stat syscall.Statfs_t
  var x1 float64
    err := syscall.Statfs("/", &stat)
    if err != nil {
      return x1
  }
    
    
    total1 := float64(stat.Blocks * uint64(stat.Bsize) )
    free1 := float64(stat.Bfree* uint64(stat.Bsize))
    used1 := total1 - free1
    //used2 := ((((used1)/1024)/1024)/1024)
    used2 := (used1/total1)*100
    
  return used2
}

func getDiskTotal() (used float64) {
  var stat syscall.Statfs_t
  var x1 float64
    err := syscall.Statfs("/", &stat)
    if err != nil {
      return x1
  }
    
    
    total2 := float64(stat.Blocks * uint64(stat.Bsize) )
    total3 := ((( total2 /1024)/1024)/1024)
  return total3
}

func getDiskFree() (used float64) {
  var stat syscall.Statfs_t
  var x1 float64
    err := syscall.Statfs("/", &stat)
    if err != nil {
      return x1
  }
    
    free2 := float64(stat.Bfree* uint64(stat.Bsize))
    free3 := (((free2/1024)/1024)/1024)
  return free3
}



func getCPUPercentage() (float64, error) {
  percent, err := cpu.Percent(0, false)
  if err != nil {
      return 0, err
  }
  return percent[0], nil
}



func getRamPercentage() (used float64) {
  memInfo, err := mem.VirtualMemory()
  var x1 float64
  if err != nil {
      return x1
  }
       
  me := (memInfo.Used * 100)/ (memInfo.Total)
        
  mem := float64(me)
  return mem
}
func getRamFree() (used float64) {
  memInfo, err := mem.VirtualMemory()
  var x1 float64
  if err != nil {
      return x1
  }
  x := float64(memInfo.Free) 
  me := (x*0.000000001)*(1000)
        
  mem := float64(me)
  return mem
}
func getRamTotal() (used float64) {
  memInfo, err := mem.VirtualMemory()
  var x1 float64
  if err != nil {
      return x1
  }
  x := float64(memInfo.Total) 
  me := x*0.000000001
        
  mem := float64(me)
  return mem
}

func getRamUsed() (used float64) {
  memInfo, err := mem.VirtualMemory()
  var x1 float64
  if err != nil {
      return x1
  }
  x := float64(memInfo.Used) 
  me := x*0.000000001
        
  mem := float64(me)
  return mem
}
