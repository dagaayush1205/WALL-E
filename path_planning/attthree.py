import math
import matplotlib.pyplot as plt
import numpy as np

def group_set(area, x1, x2):
    for i in range(min(x1[0], x2[0]), max(x1[0], x2[0])):
        for j in range(min(x1[1], x2[1]), max(x1[1], x2[1])):
            area[i][j] = -1

    obs_plot(x1[0],x1[1],x2[0],x2[1])


def obs_plot(x1,y1,x2,y2):
    # plt.plot([x1,x2],[y1,y2],"-b")#12
    # plt.plot([x2,x2],[y1,y2],"-b")#23
    # plt.plot([x2,x1],[y2,y2],"-b")#34
    # plt.plot([x1,x1],[y2,y1],"-b")#45
    # plt.show()
    a = sorted([x1, x2])
    b = sorted([y1, y2])
    #breakpoint()
    plt.plot([a[0],a[1],a[1],a[0],a[0]],[b[0],b[0],b[1],b[1],b[0]],"-b")


def detected(area):
    group_set(area, (30,25), (35,25))


def distance(x1,y1,x2,y2):
    return math.sqrt(math.pow((x1-x2),2)+math.pow((y1-y2),2))


def cost_from_start(curr_posx,curr_posy,next_posx,next_posy,area):
    return area[curr_posx][curr_posy][1] + distance(curr_posx,curr_posy,next_posx,next_posy)


def heuristic_cost(curr_posx,curr_posy,goal):
    return distance(curr_posx,curr_posy,goal[0],goal[1])


def final_cost(curr_posx,curr_posy,next_posx,next_posy,goal,area):
    return cost_from_start(curr_posx,curr_posy,next_posx,next_posy,area) + heuristic_cost(curr_posx,curr_posy,goal)


def neighbour_cells(pos,playGround,area,goal):
    cells=[]
    #(-1-1)
    if  pos[0]-1 >= playGround[0] and pos[0]-1 <= playGround[1] and pos[1]-1 >= playGround[2] and pos[1]-1 <= playGround[3]:
        if area[pos[0]-1][pos[1]-1][3] == 0:
            cells.append([pos[0]-1,pos[1]-1])
            area[pos[0]-1][pos[1]-1][0] = pos[0]
            area[pos[0]-1][pos[1]-1][1] = pos[1]
            area[pos[0]-1][pos[1]-1][3] = 1
            area[pos[0]-1][pos[1]-1][2] = final_cost(pos[0],pos[1],pos[0]-1,pos[1]-1,goal,area)

    #(0 -1)
    if  pos[0] >= playGround[0] and pos[0] <= playGround[1] and pos[1]-1 >= playGround[2] and pos[1]-1 <= playGround[3]:
        if area[pos[0]][pos[1]-1][3] == 0:
            cells.append([pos[0],pos[1]-1]) 
            area[pos[0]][pos[1]-1][0] = pos[0]
            area[pos[0]][pos[1]-1][1] = pos[1]
            area[pos[0]][pos[1]-1][3] = 1
            area[pos[0]][pos[1]-1][2] = final_cost(pos[0],pos[1],pos[0],pos[1]-1,goal,area)

    #(+1 -1)
    if  pos[0]+1 >= playGround[0] and pos[0]+1 <= playGround[1] and pos[1]-1 >= playGround[2] and pos[1]-1 <= playGround[3]:
        if area[pos[0]+1][pos[1]-1][3] == 0:
            cells.append([pos[0]+1,pos[1]-1])
            area[pos[0]+1][pos[1]-1][0] = pos[0]
            area[pos[0]+1][pos[1]-1][1] = pos[1]
            area[pos[0]+1][pos[1]-1][3] = 1
            area[pos[0]+1][pos[1]-1][2] = final_cost(pos[0],pos[1],pos[0]+1,pos[1]-1,goal,area)

    #(+1 0)
    if  pos[0]+1 >= playGround[0] and pos[0]+1 <= playGround[1] and pos[1] >= playGround[2] and pos[1] <= playGround[3]:
        if area[pos[0]+1][pos[1]][3] == 0:
            cells.append([pos[0]+1,pos[1]])
            area[pos[0]+1][pos[1]][0] = pos[0]
            area[pos[0]+1][pos[1]][1] = pos[1]
            area[pos[0]+1][pos[1]][3] = 1
            area[pos[0]+1][pos[1]][2] = final_cost(pos[0],pos[1],pos[0]+1,pos[1],goal,area)

    #(+1 +1)
    if pos[0]+1 >= playGround[0] and pos[0]+1 <= playGround[1] and pos[1]+1 >= playGround[2] and pos[1]+1 <= playGround[3]:
        if area[pos[0]+1][pos[1]+1][3] == 0:
            cells.append([pos[0]+1,pos[1]+1])
            area[pos[0]+1][pos[1]+1][0] = pos[0]
            area[pos[0]+1][pos[1]+1][1] = pos[1]
            area[pos[0]+1][pos[1]+1][3] = 1
            area[pos[0]+1][pos[1]+1][2] = final_cost(pos[0],pos[1],pos[0]+1,pos[1]+1,goal,area)

    #(0 +1)
    if  pos[0] >= playGround[0] and pos[0] <= playGround[1] and pos[1]+1 >= playGround[2] and pos[1]+1 <= playGround[3]:
        if area[pos[0]][pos[1]+1][3] == 0:
            cells.append([pos[0],pos[1]+1])
            area[pos[0]][pos[1]+1][0] = pos[0]
            area[pos[0]][pos[1]+1][1] = pos[1]
            area[pos[0]][pos[1]+1][3] = 1
            area[pos[0]][pos[1]+1][2] = final_cost(pos[0],pos[1],pos[0],pos[1]+1,goal,area)
    
    #(-1 +1)
    if  pos[0]-1 >= playGround[0] and pos[0]-1 <= playGround[1] and pos[1]+1 >= playGround[2] and pos[1]+1 <= playGround[3]:
        if area[pos[0]-1][pos[1]+1][3] == 0:
            cells.append([pos[0]-1,pos[1]+1])
            area[pos[0]-1][pos[1]+1][0] = pos[0]
            area[pos[0]-1][pos[1]+1][1] = pos[1]
            area[pos[0]-1][pos[1]+1][3] = 1
            area[pos[0]-1][pos[1]+1][2] = final_cost(pos[0],pos[1],pos[0]-1,pos[1]+1,goal,area)

    #(-1 0)
    if pos[0]-1 >= playGround[0] and pos[0]-1 <= playGround[1] and pos[1] >= playGround[2] and pos[1] <= playGround[3]:
        if area[pos[0]-1][pos[1]][3]  == 0:
            cells.append([pos[0]-1,pos[1]])
            area[pos[0]-1][pos[1]][0] = pos[0]
            area[pos[0]-1][pos[1]][1] = pos[1]
            area[pos[0]-1][pos[1]][3] = 1
            area[pos[0]-1][pos[1]][2] = final_cost(pos[0],pos[1],pos[0]-1,pos[1],goal,area)

    area[pos[0]][pos[1]][3] = 2 # closed the current cell
    pos = least_cost(check_open_cells(area),area)
    return area, pos


# def neighbour_least_cost(cells,pos,goal,orientation,area):
    cost=[]
    least=[0,0,100000,0]
    for i in range(0,len(cells)-1):
        a = distance(cells[i][0],cells[i][1],pos[0],pos[1])+distance(cells[i][0],cells[i][1],goal[0],goal[1])#+orientation[i][0]
        if area[cells[i][0]][cells[i][1]] == 2:
            a+=1000
            area[cells[i][0]][cells[i][1]] = 1
            print(cells[i][0]," ",cells[i][1])
        cost.append([cells[i][0],cells[i][1],a])
        
        if least[2] > cost[i][2]:
            least[0] = cost[i][0]
            least[1] = cost[i][1]
            least[2] = cost[i][2]
            #least[3] = orientation[i]

            #print(orientation[i])
    print("Cost:",cost)
        #print("least:",least)
    #plt.plot([pos[0],pos[1]],[least[0],least[1]],"-b")
    #print("final:",least)
    return least,area


def check_open_cells(area):
    open_cells=[]

    for i in range(100):
        for j in range(100):
            if area[i][j][3] == 1:
                open_cells.append([i,j])
            if area[i][j][3] == 2:
                plt.plot(i,j,"-xb")
    
    return open_cells


def least_cost(open_cells,area):
    l=[0,0,100000]
    #print("open Cells: ",open_cells)
    print(len(open_cells))
    for i in range (len(open_cells)):
        if l[2] > area[open_cells[i][0]][open_cells[i][1]][2]:
            l[2] = area[open_cells[i][0]][open_cells[i][1]][2]
            l[0] = open_cells[i][0]
            l[1] = open_cells[i][1]
    return l

# def open_cell_size_check(area,open_cells):
#     if len(open_cells)>50:
        


def goal_check(goal,area):
    if area[goal[0]][goal[1]][3] == 1:
        return 1
    return 0


def main():
    playGround=[0,100,0,100]
    """
    0: new
    1: open
    -1: obstacle
    2: closed
    3: blocked
    """
    plt.axis([0,50,0,50])
    plt.grid()
    start=[0,0]
    waypoint=[[30,30],[20,30]]
    pos = start
    a=[0,0]
    area = [[[0 for _ in range(4)] for _ in range(playGround[3]+1)] for _ in range(playGround[1]+1)]
    for i in range(25,28):
        for j in range(30,100):
            area[i][j][3]=-1
    obs_plot(25,20,28,100)
    for i in range (len(waypoint)):
        goal = waypoint[i]
        #print(i)
        it = 0
        while pos != goal:
            #area = detected(area)
            area, pos = neighbour_cells(pos,playGround,area,goal)
            a=pos
            #print(a)
            #plt.plot([pos[0],pos[1]],[a[0],a[1]],"-r")
            a=pos
            plt.gcf().canvas.mpl_connect(
            'key_release_event',
            lambda event: [exit(0) if event.key == 'escape' else None])
            plt.pause(0.01)
            plt.plot(goal[0], goal[1], "-xr")
            plt.plot([0,playGround[1],playGround[1],0,0],[0,0,playGround[3],playGround[3],0],"-r")
            it+=1
            if goal_check(goal,area):
                print("goal reached")
                break
           # print("next step:",a)
        print("ALERT: Reached Waypoint",i)
        x = area[goal[0]][goal[1]][0]
        y = area[goal[0]][goal[1]][1]
        plt.clf()
        while(it):
            it-=1
            plt.plot([x],[y],"-b")
            #print(x," ",y)
            x = area[x][y][0]
            y = area[x][y][1]
        plt.grid()
    plt.show()
        



if __name__=='__main__':
    main()