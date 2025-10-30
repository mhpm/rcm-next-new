import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/app/generated/prisma'

export async function GET() {
  try {
    const ministries = await prisma.ministries.findMany({
      include: {
        church: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        members: {
          include: {
            member: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
    })

    return NextResponse.json(ministries)
  } catch (error) {
    console.error('Error fetching ministries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ministries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, church_id } = body

    if (!name || !church_id) {
      return NextResponse.json(
        { error: 'Name and church_id are required' },
        { status: 400 }
      )
    }

    // Use Prisma.MinistriesUncheckedCreateInput for better type safety
    const ministryData: Prisma.MinistriesUncheckedCreateInput = {
      name,
      description,
      church_id,
    }

    const ministry = await prisma.ministries.create({
      data: ministryData,
      include: {
        church: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    return NextResponse.json(ministry, { status: 201 })
  } catch (error) {
    console.error('Error creating ministry:', error)
    return NextResponse.json(
      { error: 'Failed to create ministry' },
      { status: 500 }
    )
  }
}