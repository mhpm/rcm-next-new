import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/app/generated/prisma'

export async function GET() {
  try {
    const churches = await prisma.churches.findMany({
      include: {
        _count: {
          select: {
            members: true,
            ministries: true,
          },
        },
      },
    })

    return NextResponse.json(churches)
  } catch (error) {
    console.error('Error fetching churches:', error)
    return NextResponse.json(
      { error: 'Failed to fetch churches' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug } = body

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      )
    }

    // Use Prisma.ChurchesCreateInput for better type safety
    const churchData: Prisma.ChurchesCreateInput = {
      name,
      slug,
    }

    const church = await prisma.churches.create({
      data: churchData,
    })

    return NextResponse.json(church, { status: 201 })
  } catch (error) {
    console.error('Error creating church:', error)
    return NextResponse.json(
      { error: 'Failed to create church' },
      { status: 500 }
    )
  }
}